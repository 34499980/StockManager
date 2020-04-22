import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { PDFService } from 'src/app/services/pdf.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';
import { Router, NavigationExtras } from '@angular/router';
import { FacturacionService } from 'src/app/services/facturacion.service';

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
  _facturacionService: FacturacionService
  _columns : any
  _rowDataIngreso: any[]=[]
  _rowDataEgreso: any[]=[]
  _rowtoPDF: any[]=[]
  _totalIngreso: Number
  _totalEgreso: Number
  _dialog: MatDialog
  _router: Router

  constructor(stockService: StockService,aruitecturaService: ArquitecturaService, pdfService: PDFService,dialog: MatDialog,router: Router,facturacionService: FacturacionService) {
    this._stockService = stockService
    this._arquitecturaService = aruitecturaService
    this._pdfService = pdfService
    this._facturacionService = facturacionService
    this._dialog = dialog
    this._router = router
   }

  ngOnInit(): void {
    this._totalEgreso = 0
    this._totalIngreso = 0
    this._arquitecturaService.getColumnsGridVentas().subscribe(res => {this._columns = res})
  }
  Add( status?: string,value?: Number, rows?: any){
    if((value == undefined && this._searchCodeIngreso != undefined)|| value != undefined){
     let index = rows.find(x => x.Code == this._articule.Code)
      if(index != undefined)
      {
        index.Unity++
        index.SubTotal = index.Price * index.Unity
      }else{
        let row = new Row(this._articule,'1');
        rows.push(row)
       }
       if(status == 'I'){
        this._totalIngreso = this.calcularTotal(rows)
       }else{
        this._totalEgreso = this.calcularTotal(rows)
       }
     
      this.cleanVariables()
      }
     
  }
  delete(value?: Number, rows?: any, status?: string){
    let index = rows.find(x => x.Code == this._articule.Code)
    if(index != undefined && index.Unity > 1)
    {
      index.Unity--
      index.SubTotal = index.Price * index.Unity
    }
    if(status == 'I'){
     this._totalIngreso = this.calcularTotal(rows)
    }else{
      this._totalEgreso = this.calcularTotal(rows)
    }
    
   
    this.cleanVariables()
    
  }
  remove(value?: Number, rows?: any, status?: string){
    let index = rows.find(x => x.Code == value)
    rows.splice(index,1)
    if(status =='I'){
     this._totalIngreso = this. calcularTotal(rows)
    }else{
      this._totalEgreso = this. calcularTotal(rows)
    }
    
    this.cleanVariables()
  }
  cargarCodigo(searchCode: String,rows: any, status: string){
    if(searchCode.length == 10){
      this.searchArticulo(searchCode)
      this.Add(status,0,rows)
    }
  }

  searchArticulo(searchCode: String){
    this._stockService.getStockByCode(searchCode).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
      }
    }
    )
   
  }

  calcularTotal(rows: any): number{
      let result
    if(rows.length > 0){
      for(let index in rows){
        result = rows[index].SubTotal
      }
    }else{
      result = 0;
    }
    return result
  }
  
  cleanVariables(){
    this._searchCodeEgreso= undefined
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
       this._facturacionService.rowsDevolucion = this._rowDataIngreso
       this._facturacionService.rows = this._rowDataEgreso
        this._router.navigate(['Pago'])
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
