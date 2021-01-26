import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Office } from 'src/app/models/office.model';
import { OfficeFilter } from 'src/app/models/officeFilter.mode';
import { OfficeService } from 'src/app/services/office.service';
import { MatTableDataSource } from '@angular/material/table';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogconfirmComponent } from 'src/app/shared/dialogs/dialogconfirm/dialogconfirm.component';
import { ToastService } from 'src/app/services/toast.service';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {  
  searchControl: FormGroup;  
  countriesData: Country[];
  officeData$: Subject<Office[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'NAME',
    'ADDRESS',
    'POSTALCODE',
    'COUNTRY',
    'STATUS',
    'ACTIONS'
    
];
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private officeService: OfficeService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.searchControl = this.formBuilder.group({
      name: [''],
      address: [''],
      postalCode: [null],
      country:[null],
      disabled: [false]
    })
    this.getOfficesFilter();
    this.loadData();
    this.searchControl.valueChanges.subscribe(val => {
      if((val.name !== '' || val.name !== null  && val.name?.length > 3) ||
        (val.postalCode !== '' && val.postalCode !== null && val.postalCode?.length === 4)){
       this.loadData();
        } else if ((val.name === '' || val.name === null) && (val.postalCode === '' || val.postalCode === null)){
          this.loadData();
        }
      });
     
     
  }
  getOfficesFilter(){

    this.officeData$.pipe(
      switchMap(res => {
        
        const officeFilter : OfficeFilter = {
          name: this.searchControl.controls.name.value?? '',
          idCountry: parseInt(this.searchControl.controls.country.value, 10),
          address: this.searchControl.controls.address.value,
          postalCode: parseInt(this.searchControl.controls.postalCode.value, 10),
          active: parseInt(this.authenticationService.getCurrentRole()) !== RolesEnum.Administrator? false: Boolean(this.searchControl.controls.disabled.value)
        };
        return this.officeService.getOfficeByFilter(officeFilter);
      })
    ).subscribe(res =>{
       this.dataSource.data = res as Office[]
    });
   
  }
  
  loadData(){
    this.officeData$.next();
  }
  clear(){
    this.searchControl.reset();
    this.searchControl.controls.address.setValue('');
    this.loadData();
  }
  add(){
    this.router.navigate([AppRouting.Office])
  }
  editOffice(id: number){
    this.router.navigate([AppRouting.Office,id])
  }
  deleteOffice(id: number){
    const title = this.translate.instant('DIALOGS.DELETE-OFFICE.TITLE')
    const message = this.translate.instant('DIALOGS.DELETE-OFFICE.MESSAGE')
    const dialogRef = this.dialog.open(DialogconfirmComponent,
       {
      disableClose: true,     
      data:{title: title, message: message}
        });
      
       dialogRef.afterClosed().subscribe(result => {
         if(result === true){
          this.officeService.delete(id).subscribe(() => 
          {this.toastService.success(this.translate.instant('OFFICE.ACTIONS.DELETE')),
          window.location.reload();
        });
      }
   });
  }
  canEdit() {
    return parseInt(this.authenticationService.getCurrentRole(), 10) === RolesEnum.Administrator
  }
  

}
