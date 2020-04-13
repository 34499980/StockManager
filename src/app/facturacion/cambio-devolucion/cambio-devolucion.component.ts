import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { PDFService } from 'src/app/services/pdf.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';

@Component({
  selector: 'app-cambio-devolucion',
  templateUrl: './cambio-devolucion.component.html',
  styleUrls: ['./cambio-devolucion.component.css']
})
export class CambioDevolucionComponent implements OnInit {
  _articule: Articulo = new Articulo
  _searchCodeIngreso: String
  _searchCodeEgreso: String
  _stockService: StockService
  _pdfService: PDFService
  _arquitecturaService: ArquitecturaService
  _columns : any
  _rowDataIngreso: any[]=[]
  _rowDataEgreso: any[]=[]
  _rowtoPDF: any[]=[]
  _totalIngreso: Number
  _totalEgreso: Number
  _dialog: MatDialog

  constructor(stockService: StockService,aruitecturaService: ArquitecturaService, pdfService: PDFService,dialog: MatDialog) {
    this._stockService = stockService
    this._arquitecturaService = aruitecturaService
    this._pdfService = pdfService
    this._dialog = dialog
   }

  ngOnInit(): void {
    this._totalEgreso = 0
    this._totalIngreso = 0
    this._arquitecturaService.getColumnsGridVentas().subscribe(res => {this._columns = res})
  }
  Add(value?: Number){
    if((value == undefined && this._searchCodeIngreso != undefined)|| value != undefined){
     let index = this._rowDataIngreso.find(x => x.Code == this._articule.Code)
      if(index != undefined)
      {
        index.Unity++
        index.SubTotal = index.Price * index.Unity
      }else{
        let row = new Row(this._articule,'1');
        this._rowDataIngreso.push(row)
       }
    
      this.calcularTotal()
      this.cleanVariables()
      }
     
  }
  delete(value?: Number){
    let index = this._rowDataIngreso.find(x => x.Code == this._articule.Code)
    if(index != undefined && index.Unity > 1)
    {
      index.Unity--
      index.SubTotal = index.Price * index.Unity
    }
    
    this.calcularTotal()
    this.cleanVariables()
    
  }
  remove(value?: Number){
    let index = this._rowDataIngreso.find(x => x.Code == value)
    this._rowDataIngreso.splice(index,1)
    this. calcularTotal()
    this.cleanVariables()
  }
  cargarCodigo(){
    if(this._searchCodeIngreso.length == 10){
      this.searchArticulo()
      this.Add()
    }
  }

  searchArticulo(){
    this._stockService.getStockByCode(this._searchCodeIngreso).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
      }
    }
    )
   
  }
  calcularTotal(){
    if(this._rowDataIngreso.length > 0){
      for(let index in this._rowDataIngreso){
        this._totalIngreso = this._rowDataIngreso[index].SubTotal
      }
    }else{
      this._totalIngreso = 0;
    }
  }
  
  cleanVariables(){
    this._searchCodeIngreso = undefined
    this._rowtoPDF =[]
  
  }
  finish(){
    if(this._rowDataIngreso.length > 0)
    {
    this.generarPDF()
    }
  }
  generarPDF(){
   
    for(let i = 0; i<this._rowDataIngreso.length;i++){
      
      let articulAux = new Articulo
      articulAux.Code = this._rowDataIngreso[i].Code 
      articulAux.Brand = this._rowDataIngreso[i].Brand 
      articulAux.Name = this._rowDataIngreso[i].Name 
      articulAux.Model = this._rowDataIngreso[i].Model 
      articulAux.Price = this._rowDataIngreso[i].Price 
     
      let row = new Row(articulAux,this._rowDataIngreso[i].Unity)
      row.SubTotal = this._rowDataIngreso[i].Price * this._rowDataIngreso[i].Unity
      this._rowtoPDF.push(row)
    } 
    let articulAux = new Articulo
    
    let row = new Row(articulAux,"Total: ", this._totalIngreso) 
    this._rowtoPDF.push(row)
    
   
   
    
    this._pdfService.generarPDF(this._columns,this._rowtoPDF,'Remito')
  }
  openDialog() {    
    const dialogRef = this._dialog.open(DialogconfirmComponent, {
       disableClose: true,
       data : {title: "Confirmar proceso", admConfirm: false}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
      }
    });
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
