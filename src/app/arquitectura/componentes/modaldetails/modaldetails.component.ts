import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
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
   _bDsiable
   _stockService: StockService   
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>,  stockService: StockService,@Inject(MAT_DIALOG_DATA) data: ModalData) {
    this._modalgRef = modalgRef
    this._stockService = stockService
    this._data = data
   
   }

  ngOnInit(): void {
  
  }
  close(){
    this._modalgRef.close()   
  }
  OpenDirectory(){
    window.open("file:///")
  }
}
