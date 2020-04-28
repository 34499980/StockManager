import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';
export interface ModalData {
  _articul: Articulo
  bDsiable: boolean
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
   _stockService: StockService  
   _fileSelected: File = null
   _fileNotFound: any
   _path: any
   @ViewChild('file') file :ElementRef
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>,  stockService: StockService,@Inject(MAT_DIALOG_DATA) data: ModalData) {
    this._modalgRef = modalgRef
    this._stockService = stockService
    this._data = data

    
   

   }

  ngOnInit(): void {
    if(this._data.bDsiable){
      this._bDsiable = true
    }else{
      this._bDsiable = false
    }
    this._fileNotFound = '../../../../assets/imageNotFound.png'
  }
  close(){
    this._modalgRef.close()   
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files[0]
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
      }
    }
    )
   
  }

}
