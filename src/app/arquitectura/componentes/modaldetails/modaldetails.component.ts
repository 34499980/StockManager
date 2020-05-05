import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
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
   _data: ModalData
   _bDsiable: any
   _rowData: any
   _columns: any
   _stockService: StockService  
   _fileSelected: File = null
   _fileNotSelected: any  
   _arquitecturaService: ArquitecturaService
   @ViewChild('file') file :ElementRef
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>,  stockService: StockService,@Inject(MAT_DIALOG_DATA) data: ModalData,arquitecturaService: ArquitecturaService) {
    this._modalgRef = modalgRef
    this._stockService = stockService
    this._data = data
    this._arquitecturaService = arquitecturaService

    
   

   }

  ngOnInit(): void {
    switch(this._data._screen){
      case"articulo":
      if(this._data.bDsiable){
        this._bDsiable = true
      }else{
        this._bDsiable = false
      }
      if(this._data._articul.Image == undefined){
        this._fileNotSelected = '../../../../assets/imageNotFound.png'
      }else{
        this._fileNotSelected = this._data._articul.Image
      }
      
      break;
      case"despacho":
        this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res} )
        this._stockService.getDespachoDataRows(this._data._despacho).subscribe(res => {this._rowData = res})
      break;
    }
   
  }
  Add(value?: Number){
    let index
    index = this._rowData.find(x => x.Code == value)
   
      index.Unity++      

}
  delete(value?: Number){
    let index = this._rowData.find(x => x.Code == value)
    if(index.Unity > 0)
    {
      index.Unity--     
    }     
  }
 
  close(){
    this._modalgRef.close()   
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files == undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected != undefined){
  
    }
   

  }
  

  cargarCodigo(){
    
    if(this._data._articul.Code.length == 10){
      this.searchArticulo()
     
    }
  }
  searchArticulo(){
    this._stockService.getStockByCode(this._data._articul.Code).subscribe(
      res => {     
      for(let index in res){
        this._data._articul = res[index] as Articulo
        this._fileNotSelected = this._data._articul.Image
        
      }
    }
    )
   
  }
  saveDispatched(){
    this._stockService.updateDataByDispatched(this._data._despacho)
  }

}
