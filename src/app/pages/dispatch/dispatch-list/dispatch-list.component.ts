import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { DispatchState } from 'src/app/enums/dispatch-state.enum';
import { Country } from 'src/app/models/country.model';
import { Dispatch, DispatchGet } from 'src/app/models/dispatch';
import { DispatchFilter } from 'src/app/models/dispatchFilter.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { DispatchService } from 'src/app/services/dispatch.service';
import { OfficeService } from 'src/app/services/office.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dispatch-list',
  templateUrl: './dispatch-list.component.html',
  styleUrls: ['./dispatch-list.component.scss']
})
export class DispatchListComponent implements OnInit {
  searchControl: FormGroup;  
  officeData: Office[];
  countriesData: Country[];
  statesData: Item[];
  dispatchData$: Subject<Dispatch[]> = new Subject();
  officeData$: Subject<Office[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  loading: boolean = true;
  displayedColumns = [
    'CODE',
    'CREATEDDATE',  
    'ORIGIN',
    'DESTINY',
    'USERORIGIN',
    'DISPATECHEDDATE',
    'USERDESTINY', 
    'RECEIVEDDATE',
    'STATUS',
    'UNITY',
    'ACTIONS'
    
];
  @ViewChild('table') table: ElementRef ;
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dispatchService: DispatchService,
              private officeService: OfficeService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private toastService: ToastService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.officeData = this.activateRoute.snapshot.data.office as Office[];
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.statesData = this.activateRoute.snapshot.data.states as Item[];
    this.searchControl = this.formBuilder.group({
      code: [''],
      name: [''],
      createdDateFrom: [null],
      createdDateTo: [null],
      dispatchedDateFrom: [null],
      dispatchedDateTo: [null],
      receivedDateFrom: [null],
      receivedDateTo: [null],     
      state: [null],
      destiny: [null],
      country: [parseInt(this.authenticationService.getCurrentCountry(), 10)]
    })    
    

    this. getDispatchFilter();
    this.loadData();

    this.searchControl.valueChanges.subscribe(val => {
      if((val.name !== '' || val.name !== null  && val.name?.length >= 3) ||
        (val.code !== '' && val.code !== null && val.code?.length >= 3)){
       this.loadData();
        } else if ((val.code === '' || val.code === null) && (val.name === '' || val.name === null)){
          this.loadData();
        }
      });
  }
  getDispatchFilter(){
    this.loading = true;
    this.dispatchData$.pipe(
      switchMap(() => {
        
        const filter : DispatchFilter = {
          code: this.searchControl.controls.code.value,
          userName: this.searchControl.controls.name.value,
          createdDateFrom: this.searchControl.controls.createdDateFrom.value,
          createdDateTo: this.searchControl.controls.createdDateTo.value,
          dispatchedDateFrom: this.searchControl.controls.dispatchedDateFrom.value,
          dispatchedDateTo: this.searchControl.controls.dispatchedDateTo.value,
          receivedDateFrom: this.searchControl.controls.receivedDateFrom.value,
          receivedDateTo: this.searchControl.controls.receivedDateTo.value,
          idState: parseInt(this.searchControl.controls.state.value, 10),
          idDestiny: parseInt(this.searchControl.controls.destiny.value, 10),
          idCountry: parseInt(this.searchControl.controls.country.value, 10)
        };
        return this.dispatchService.GetAllDispatchFilter(filter);
      })
    ).subscribe(res =>{     
       this.dataSource.data = res as DispatchGet[];
       this.loading = false;
    //   this.table.nativeElement.scrollIntoView();
    });
   
  }
  dispatchState(dispatch: Dispatch){
    return (dispatch.idState === DispatchState.Created &&
     dispatch.idOrigin === parseInt(this.authenticationService.getCurrentOffice(), 10)) ||
     (dispatch.idState === DispatchState.Received && dispatch.idDestiny === parseInt(this.authenticationService.getCurrentOffice(), 10))
  }
  dispatchRecivedState(dispatch: Dispatch){
    return dispatch.idState === DispatchState.Dispatched &&
    dispatch.idDestiny === parseInt(this.authenticationService.getCurrentOffice(), 10);
  }
  loadData(){
    this.dispatchData$.next();
  }
  add() {
    this.router.navigate([AppRouting.DispatchCreate])
  }
  edit(dispatch: Dispatch) {
    if(dispatch.idOrigin === parseInt(this.authenticationService.getCurrentOffice(), 10)
        && dispatch.idState === DispatchState.Created) {
      this.router.navigate([AppRouting.DispatchCreate, dispatch.id]);
    } else {
      this.router.navigate([AppRouting.DispatchRecive, dispatch.id]);
    }
   

  }
  showDispatch(id: number) {
    this.router.navigate([AppRouting.DispatchRecive, id]);
  }
  recive(dispatch: Dispatch){
    dispatch.idState = DispatchState.Received;
    this.dispatchService.update(dispatch).subscribe(() => {
            this.toastService.success(this.translate.instant('DISPATCH.ACTIONS.UPDATE'));
            this.loadData(); 
    });
  }
  clear(){
    this.searchControl.reset();
    this.searchControl.controls.country.setValue(parseInt(this.authenticationService.getCurrentCountry(), 10));
  }

}
