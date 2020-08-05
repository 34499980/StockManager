import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DispatchService } from 'src/app/services/dispatch.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Dispatch } from '../../class/Dispatch';
export interface ModalData {
  _articul: Articulo
  bDsiable: boolean
  _screen: string
  _despacho: string
  
}
@Component({
  selector: 'app-modaldetails',
  templateUrl: './modaldetails.component.html',
  styleUrls: ['./modaldetails.component.css'],
})
export class ModaldetailsComponent implements OnInit {
 _modalgRef :  MatDialogRef<ModaldetailsComponent>
 
  selectFormControl = new FormControl('', Validators.required);
   _origen: any
   _destino: any
   _dispatch:any
   _sucursal: any
   _data: ModalData
   _bDsiable: any
   _rowData: any
   _columns: any
   _stockService: StockService 
   _dispatchServices: DispatchService 
   _fileSelected: File = null
   _fileNotSelected: any  
   _arquitecturaService: ArquitecturaService
   _userService: UserService
   @ViewChild('file') file :ElementRef
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>,  stockService: StockService,@Inject(MAT_DIALOG_DATA) data: ModalData,arquitecturaService: ArquitecturaService,dispatchService: DispatchService,private userService: UserService) {
    this._modalgRef = modalgRef
    this._stockService = stockService
    this._data = data
    this._arquitecturaService = arquitecturaService
    this._dispatchServices = dispatchService
    this._userService = userService
   
   

   }

  ngOnInit(): void {
    switch(this._data._screen){
      case"articulo":
      if(this._data.bDsiable){
        this._bDsiable = true
      }else{
        this._bDsiable = false
      }
      if(this._data._articul.image == undefined){
        this._fileNotSelected = '../../../../assets/imageNotFound.png'
      }else{
        this._fileNotSelected = this._data._articul.image
      }
      
      break;
      case"despacho":
        this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res} )
        this._dispatchServices.getDespachoDataRows(this._data._despacho).subscribe(res => {this._rowData = res})
      break;
      case"CrearDespacho":
      this._sucursal = [{name: "example"}]
      this._userService.getAllSucursal().subscribe(res => {this._sucursal = res})
      break;
    
    }
   
  }
  changeSucursal(sucursal,type){
    if( type== "origen"){
      this._origen = sucursal
    }else{
      this._destino = sucursal
    }    
  }
  Add(value?: Number){
    let index
    index = this._rowData.find(x => x.code == value)
   
      index.Unity++      

}
  delete(value?: Number){
    let index = this._rowData.find(x => x.code == value)
    if(index.Unity > 0)
    {
      index.Unity--     
    }     
  }
 
  close(){
    switch (this._data._screen){
      case "CrearDespacho":    
       let dispatch= new Dispatch() 
       dispatch.Code = this._dispatch
       dispatch.Origin = this._origen
       dispatch.Destiny = this._destino   
        this._modalgRef.close(dispatch)   
        break;
        default:
          this._modalgRef.close()   
          break;
    }
    
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files == undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected != undefined){
  
    }
   

  }
  

  cargarCodigo(){
    
    if(this._data._articul.code.length == 10){
      this.searchArticulo()
     
    }
  }
  searchArticulo(){
    this._stockService.getStockByCode(this._data._articul.code).subscribe(
      res => {     
        if(res != null)
        this._data._articul = res as Articulo
        
        
      
    }
    )
   
  }
  saveDispatched(){    
    this._dispatchServices.CreateDispatched(this._origen.id,this._destino.id).subscribe(res => {this._dispatch = res, this.close()})
   
  }
  save(){
    this._stockService.saveStock(this._data._articul)
    this.close()
  }

}
