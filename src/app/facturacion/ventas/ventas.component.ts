import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { PDFService } from 'src/app/services/pdf.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Router, NavigationExtras } from '@angular/router';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  _articule: Articulo = new Articulo
  _searchCode: String
  _stockService: StockService
  _pdfService: PDFService
  _arquitecturaService: ArquitecturaService
  _columns : any
  _rowData: any[]=[]
  _rowtoPDF: any[]=[]
  _total: Number
  _router: Router
  _dialog: MatDialog

  constructor(stockService: StockService,aruitecturaService: ArquitecturaService, pdfService: PDFService,router: Router,dialog: MatDialog) {
    this._stockService = stockService
    this._arquitecturaService = aruitecturaService
    this._pdfService = pdfService
    this._router = router
    this._dialog = dialog
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
        let row = new Row(this._articule,'1');
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
    this._stockService.getStockByCode(this._searchCode).subscribe(
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
    this._rowtoPDF =[]
  
  }
  finish(){
    if(this._rowData.length > 0)
    {
     this.openDialog()
    }
  }
  generarPDF(){
   
    for(let i = 0; i<this._rowData.length;i++){
      
      let articulAux = new Articulo
      articulAux.Code = this._rowData[i].Code 
      articulAux.Brand = this._rowData[i].Brand 
      articulAux.Name = this._rowData[i].Name 
      articulAux.Model = this._rowData[i].Model 
      articulAux.Price = this._rowData[i].Price 
     
      let row = new Row(articulAux,this._rowData[i].Unity)
      row.SubTotal = this._rowData[i].Price * this._rowData[i].Unity
      this._rowtoPDF.push(row)
    } 
    let articulAux = new Articulo
    
    let row = new Row(articulAux,"Total: ", this._total) 
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
        const queryParams: any = {};
        queryParams.myArray = JSON.stringify(this._rowData);
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        this._router.navigate(['Pago'],navigationExtras)
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
