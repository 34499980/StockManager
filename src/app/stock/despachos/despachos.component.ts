import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  _despacho: String
  _rowData: any[]=[]
  _columns: any
 _disableButton: boolean 
 _articule: Articulo
 _searchCode: any
  _stockService: StockService
  _titleButtonCreate : string
  _arquitecturaService: ArquitecturaService
  constructor(stockService: StockService, arquitecturaService: ArquitecturaService) { 
    this._stockService = stockService
    this._arquitecturaService = arquitecturaService
  }

  ngOnInit(): void {
    this._despacho = ""
    this._titleButtonCreate = "Create" 
    this._disableButton = false  
    this._searchCode = undefined
    this._arquitecturaService.getDespachoColumns().subscribe(res => {this._columns = res})
    this._stockService.getDespachoRows().subscribe(res => {this._rowData = res})
  }
  searchDespatched(){ 
     if(this._despacho.length == 10){
      this._disableButton = true
      this._titleButtonCreate = "Cancel" 
      this._rowData = []
      //this._stockService.getDespachoDataRows(this._despacho).subscribe(res => {this._rowData = res})
      this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
     } else{
      this._arquitecturaService.openDialog("Error","Ingreso un formato de despacho incorrecto")
     }       
  
  }  
  assignDispatched(dispatched: string){
    this._despacho = dispatched
    this._disableButton = true
    this._titleButtonCreate = "Cancel" 
    this._rowData = []
   // this._stockService.getDespachoDataRows(this._despacho).subscribe(res => {this._rowData = res})
    this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
  }
  createCancelDispatched(){
    if(this._disableButton){
     this.ngOnInit()
    }
  }
  cargarCodigo(){
    if(this._searchCode.length == 10){
      this.searchArticulo()
      this.Add()
    }
  }
  searchArticulo(){
    this._stockService.getDespachoDataRows(this._despacho,this._searchCode).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
      }
    }
    )
   
  }
  Add(value?: Number){
    if(value != undefined){
      this._searchCode = value
      this.searchArticulo()
    }
    if((value == undefined && this._searchCode != undefined)|| value != undefined){
     let index = this._rowData.find(x => x.Code == this._articule.Code)
      if(index != undefined)
      {      
        index.Unity++       
      }else{
        let row = new Row(this._articule,'1');
        this._rowData.push(row)
       }   
  
      }
      this._searchCode = undefined
     
  }
  delete(value?: Number){
    let index = this._rowData.find(x => x.Code == this._articule.Code)
    if(index != undefined && index.Unity > 1)
    {
      index.Unity--
      index.SubTotal = index.Price * index.Unity
    }  

    
  }
  
  

}

class Row{
  Code: string
  Name: string
  Brand: string
  Model: string
  Price: Number
  Unity: string
  SubTotal: Number
 
  constructor(articule: Articulo, unity: string, total?: Number){
    this.Code = articule.Code
    this.Name = articule.Name
    this.Brand = articule.Brand
    this.Model = articule.Model
    this.Price = articule.Price
    this.Unity = unity
    this.SubTotal = total==undefined? articule.Price: total
    

  }
}