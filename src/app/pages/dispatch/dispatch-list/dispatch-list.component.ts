import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
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
  displayedColumns = [
    'CODE',
    'ORIGIN',
    'DESTINY',
    'USERORIGIN',
    'USERDESTINY',    
    'DISPATECHEDDATE',
    'RECEIVEDDATE',
    'STATUS',
    'UNITY'
    
];
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
      createdDateFrom: [''],
      createdDateTo: [''],
      dispatchedDateFrom: [''],
      dispatchedDateTo: [''],
      receivedDateFrom: [''],
      receivedDateTo: [''],     
      state: [''],
      destiny: [''],
      country: [parseInt(this.authenticationService.getCurrentCountry(), 10)]
    })
    this.searchControl.controls.country.valueChanges.pipe(     
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      }),
      startWith(this.officeData)
      ).subscribe(this.officeData$);  
  }
  getDispatchFilter(){

    this.dispatchData$.pipe(
      switchMap(() => {
        
        const filter : DispatchFilter = {
          code: this.searchControl.controls.code.value,
          userName: this.searchControl.controls.name.value,
          createdDateFrom: this.searchControl.controls.CreatedDateFrom.value,
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
       this.dataSource.data = res as DispatchGet[]
    });
   
  }
  add() {

  }
  edit(id: number) {

  }
  clear(){
    this.searchControl.reset();
    this.searchControl.controls.country.setValue(parseInt(this.authenticationService.getCurrentCountry(), 10));
  }

}
