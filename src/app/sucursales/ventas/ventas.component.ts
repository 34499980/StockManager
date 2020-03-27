import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  _articule: Articulo = new Articulo
  _searchCode: String
  _stockService: StockService
  _arquitecturaService: ArquitecturaService
  _columns : any
  _rowData: any[]=[]
  _total: Number

  constructor(stockService: StockService,aruitecturaService: ArquitecturaService) {
    this._stockService = stockService
    this._arquitecturaService = aruitecturaService
   }

  ngOnInit(): void {
    this._total = 0
    this._arquitecturaService.getColumnsGridVentas().subscribe(res => {this._columns = res})
  }
  Add(value?: Number){
    if((value == undefined && this._searchCode != undefined)|| value != undefined){
     let index = this._rowData.find(x => x.Code == this._articule.Code)
      if(index != undefined)
      {
        index.Unity++
        index.SubTotal = index.Price * index.Unity
      }else{
        let row = new Row(this._articule,1);
        this._rowData.push(row)
       }
    
      this.calcularTotal()
      this.cleanVariables()
      }
     
  }
  delete(value?: Number){
    let index = this._rowData.find(x => x.Code == this._articule.Code)
    if(index != undefined && index.Unity > 1)
    {
      index.Unity--
      index.SubTotal = index.Price * index.Unity
    }
    
    this.calcularTotal()
    this.cleanVariables()
    
  }
  remove(value?: Number){
    let index = this._rowData.find(x => x.Code == value)
    this._rowData.splice(index,1)
    this. calcularTotal()
    this.cleanVariables()
  }
  cargarCodigo(){
    if(this._searchCode.length == 10){
      this.searchArticulo()
      this.Add()
    }
  }

  searchArticulo(){
    this._stockService.getStockByCode().subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
      }
    }
    )
   
  }
  calcularTotal(){
    if(this._rowData.length > 0){
      for(let index in this._rowData){
        this._total = this._rowData[index].SubTotal
      }
    }else{
      this._total = 0;
    }
  }
  
  cleanVariables(){
    this._searchCode = undefined
  
  }
 
 
}
 class Row{
  Code: string
  Name: string
  Brand: string
  Model: string
  Price: Number
  Unity: Number
  SubTotal: Number
  constructor(articule: Articulo, unity: Number){
    this.Code = articule.Code
    this.Name = articule.Name
    this.Brand = articule.Brand
    this.Model = articule.Model
    this.Price = articule.Price
    this.Unity = unity
    this.SubTotal = articule.Price

  
  }
}