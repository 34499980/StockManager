import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Dispatch } from 'src/app/models/dispatch';
import { Dispatch_stock } from 'src/app/models/dispatch_stock.model';
import { Stock } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  stepTwoForm: FormGroup;
  @Input() dispatch: Dispatch;
  @Input() private uploadDispatch: EventEmitter<Dispatch>;
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'CODE',
    'NAME',  
    'MODEL',
    'BRAND',
    'UNITY',   
    'ACTIONS'
    
];
  constructor(private formBuilder: FormBuilder,
              private stockService: StockService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
   this.stepTwoForm = this.formBuilder.group({
     code : ['', [Validators.pattern(/^[0-9a-zA-Z-]+$/)]]
   });
    if (this.uploadDispatch) {
      this.uploadDispatch.subscribe(data => {
        this.dispatch = data
      });
    }
    this.stepTwoForm.valueChanges.subscribe(val => {
      if (val.code?.length === 10){     
        this.addStock(val.code);
        this.stepTwoForm.reset();
      }
    })
  }
  search(code: string) {
  return this.dataSource.data.find(x => x.code === code);
  }
  searchStockByOffice(array: Stock_Office[]){
    return array.find(x => x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10))
  }
  addStock(code: string) {
    const stock: Stock = this.search(code);
    if (stock) {
      if (stock.unity > stock.count) {
        this.dispatch.dispatch_stock.find(x => x.idStock === stock.id).unity++;
        stock.count++;
      }
    } else {
      this.stockService.getStockByCode(code).subscribe(res => { 
        const newRow = res as Stock;
        newRow.unity = this.searchStockByOffice(newRow.stock_Office).unity;
        const dispatch_stock: Dispatch_stock ={
          idDispatch: this.dispatch.id,
          idStock: newRow.id,
          unity: 1
        };
        this.dispatch.dispatch_stock.push(dispatch_stock);
        newRow.count++;
        this.dataSource.data = [...this.dataSource.data, newRow]       
      });
    }
   
  }
  removeStock(code: string) {
    const stock = this.search(code);
    if(stock.count > 1) {
      stock.count--;
     const stockOffice = this.searchStockByOffice(stock.stock_Office);
     stockOffice.unity--;

    } else if(stock.count === 1) {
      stock.count--;
      const stockOffice = this.searchStockByOffice(stock.stock_Office);
      stockOffice.unity--;
      this.dataSource.data = this.dataSource.data.find(x => x.code !== stock.code);
    }
   
  }
  

}
