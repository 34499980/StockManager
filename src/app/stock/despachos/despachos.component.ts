import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ModaldetailsComponent } from 'src/app/arquitectura/componentes/modaldetails/modaldetails.component';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  _despacho: String
  _rowData: any[]=[]
  _rowDataDispatchedOrigin: any[]=[]
  _columns: any
 _disableButton: boolean 
 _articule: Articulo
 _searchCode: any
  _OkImage: string
  _NotOkImage: string
  _stockService: StockService
  _titleButtonCreate : string
  _arquitecturaService: ArquitecturaService
  _dialog: MatDialog
  _modal: MatDialog
  constructor(stockService: StockService, arquitecturaService: ArquitecturaService,dialog: MatDialog,modal: MatDialog) { 
    this._stockService = stockService
    this._arquitecturaService = arquitecturaService
    this._dialog = dialog
    this._modal = modal
  }

  ngOnInit(): void {
    this._OkImage = '../../../../assets/ok_check.png'
    this._NotOkImage = '../../../../assets/notok_check.png'
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
    this._stockService.getDespachoDataRows(this._despacho).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
        let row = new Row(this._articule);
        this._rowData.push(row)
      }
    }
    )
    this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
  }
  createCancelDispatched(){
    if(this._disableButton){
     this.ngOnInit()
    }
  }
  cargarCodigo(){
    if(this._searchCode.length == 10){
      //this.searchArticulo()
      this.Add(this._searchCode)
      this._searchCode = undefined
    }
  }
  searchArticulo(){
    this._stockService.getDespachoDataRows(this._despacho).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
        //let row = new Row(this._articule);
        //this._rowData.push(row)
      }
    }
    )
   
  }
  cargarDespacho(){
    if(this._despacho==" " || this._despacho==undefined || this._despacho.length == 0){
      this._stockService.getDespachoRows().subscribe(res => {this._rowData = res})
    }else{    
      this._rowData = [] 
      this._stockService.getDespachoRows().subscribe(res => {this._rowDataDispatchedOrigin = res})
      for(let index in this._rowDataDispatchedOrigin){
        let row = this._rowDataDispatchedOrigin[index] 
        if(row.ID.indexOf(this._despacho) != -1){
          this._rowData.push(row)
        }

      }    
  
    }
  }
  Add(value?: Number){
    let index
    if(value != undefined){      
       index = this._rowData.find(x => x.Code == value)
    }else{
      index = this._rowData.find(x => x.Code == this._articule.Code)
    }
    if(index.Count < index.Unity && (index.Count == 0 && this._searchCode != undefined)){
        index.Count++      
     
  }else{
    if(index.Count < index.Unity && (index.Count >0)){
      index.Count++      
  }
}
  }
  delete(value?: Number){
    let index = this._rowData.find(x => x.Code == value)
    if(index != undefined && index.Count > 0)
    {
      index.Count--     
    }     
  }
  finish(){
   let bFlag = this._rowData.find(x => x.Count!= x.Unity)
   if(bFlag){
     this._arquitecturaService.openDialog('Warning','Quedaron bultos sin leer!')
   }
   else{
     this.createCancelDispatched()
     this._stockService.changeDespachoState(this._despacho)
   }
  } 
  openDialog() {    
    const dialogRef = this._dialog.open(DialogconfirmComponent, {
       disableClose: true,
       data : {title: "Confirmación gerente", admConfirm: true}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(true){
        this.openModal()
      }
    });
  }
  openModal() { 
  
    const dialogRef = this._modal.open(ModaldetailsComponent, {
       disableClose: true,
       data : {_despacho:this._despacho, _screen:"despacho"}
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
  Unity: Number
  Count: Number
  width: number
  height: number
 
  constructor(articule: Articulo){
    this.Code = articule.Code
    this.Name = articule.Name
    this.Brand = articule.Brand
    this.Model = articule.Model
    this.Price = articule.Price
    this.Unity = articule.Unity
    this.Count = 0
    this.width = 2
    this.height = 2
    

  }
}