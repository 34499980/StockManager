import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { Stock, StockGet } from 'src/app/models/stock';
import { StockFilter } from 'src/app/models/stockFilter.mode';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';
import { DialogconfirmComponent } from 'src/app/shared/dialogs/dialogconfirm/dialogconfirm.component';
import { ModalStockComponent } from 'src/app/shared/dialogs/modal-stock/modal-stock.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  searchControl: FormGroup; 
  countriesData: Country[];
  officeData$: Observable<Office[]>; 
  stockData$: Subject<Stock[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'CODE',
    'NAME',
    'BRAND',
    'MODEL',
    'OFFICE',
    'UNITY',   
    'ACTIONS'
    
];
@ViewChild('sidenav') sideNavFilters: MatDrawer;
toggleIsFilterPanelOpen = true;
constructor(private activateRoute: ActivatedRoute,
  private formBuilder: FormBuilder,
  private stockService: StockService,
  private dialog: MatDialog,
  private translate: TranslateService,   
  private router: Router,
  private officeService: OfficeService,
  private toastService: ToastService,
  private authentication: AuthenticationService) { }

  ngOnInit(): void { 
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.searchControl = this.formBuilder.group({
      name: [''],
      code: [''],
      brand: [''],
      model:[''],
      idOffice: [parseInt(this.authentication.getCurrentOffice(), 10)],
      idCountry: [parseInt(this.authentication.getCurrentCountry(), 10)]

    })
     this.officeData$ = this.searchControl.controls.idCountry.valueChanges.pipe(
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      })
      );
    
    this.getStockFilter();
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
  getStockFilter(){
    this.stockData$.pipe(
      switchMap(res => {
        
        const stockFilter : StockFilter = {
          name: this.searchControl.controls.name.value,
          brand: this.searchControl.controls.brand.value,
          code: this.searchControl.controls.code.value,
          idCountry: parseInt(this.searchControl.controls.idCountry.value,10),
          idOffice:parseInt(this.searchControl.controls.idOffice.value,10),
          model: this.searchControl.controls.model.value,
        }
        return this.stockService.getStockByFilter(stockFilter);
      })
    ).subscribe(res =>{
       this.dataSource.data = res as StockGet[]
       this.dataSource.data.forEach(element => {element.unity = element.stock_Office.find(x => x.idOffice === element.idOffice).unity})
    });
    

  }
  loadData(){
    this.stockData$.next();
  }
  clear(){
    this.searchControl.reset();
    this.loadData();
  }
  addStock(){  
    const dialogRef = this.dialog.open(ModalStockComponent,{
      disableClose: true,  
      height: '460px',
       width: '60%',
       data: {countriesData: this.countriesData}      
    }).afterClosed().subscribe(res => {
      if(res){
        this.loadData();
      }
      });
  }
  deleteStock(id: number){
    const title = this.translate.instant('DIALOGS.DELETE-STOCK.TITLE')
    const message = this.translate.instant('DIALOGS.DELETE-STOCK.MESSAGE')
    const dialogRef = this.dialog.open(DialogconfirmComponent,
       {
      disableClose: true,     
      data:{title: title, message: message}
        });
      
       dialogRef.afterClosed().subscribe(res => {
         if(res){
          this.stockService.delete(id).subscribe(() => 
          {this.toastService.success(this.translate.instant('STOCK.ACTIONS.DELETE')),
         this.loadData();
        });
      }
   });
  }
  editStock(id: number){
    this.stockService.getStockById(id).subscribe(res => {
      const dialogRef = this.dialog.open(ModalStockComponent,{
        disableClose: true,  
        height: '460px',
         width: '65%',
         data: {
                countriesData: this.countriesData,
                stock:  res as StockGet
              }      
      }).afterClosed().subscribe(res => {
        if(res){
          this.loadData();
        }
        });
    })
 
  }

}
