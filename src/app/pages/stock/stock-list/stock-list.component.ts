import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { Stock, StockGet } from 'src/app/models/stock';
import { StockFilter } from 'src/app/models/stockFilter.mode';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  searchControl: FormGroup; 
  countriesData: Country[];
  officeData$: Observable<Office>;
  officeData: Office[];
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
  private officeService: OfficeService) { }

  ngOnInit(): void {
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.searchControl = this.formBuilder.group({
      name: [''],
      code: [''],
      brand: [''],
      model:[''],
      idOffice: [''],
      idCountry: ['']

    })
     this.officeData$ = this.searchControl.controls.idCountry.valueChanges.pipe(
      tap(() => {
       
      }),
      switchMap(val => {
        return this.stockService.getStockByCode(val.idCountry);
      })
      );
    
    this.getTicketFilter();
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
  getTicketFilter(){
    this.stockData$.pipe(
      switchMap(res => {
        
        const stockFilter : StockFilter = {
          name: this.searchControl.controls.name.value,
          brand: this.searchControl.controls.brand.value,
          code: this.searchControl.controls.code.value,
          idCountry: this.searchControl.controls.idCountry.value,
          idOffice: this.searchControl.controls.idOffice.value,
          model: this.searchControl.controls.model.value,
        }
        return this.stockService.getStockByFilter(stockFilter);
      })
    ).subscribe(res =>{
       this.dataSource.data = res as StockGet[]
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

  }
  deleteStock(id: number){

  }
  editStock(id: number){

  }

}
