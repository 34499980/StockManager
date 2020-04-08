import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
export interface ModalData {
  _articul: Articulo
  
}
@Component({
  selector: 'app-modaldetails',
  templateUrl: './modaldetails.component.html',
  styleUrls: ['./modaldetails.component.css'],
  animations: [trigger ('host', [
                  transition(':leave', [
                    query('@backdrop,@box',[
                      animateChild()
                    ])
                  ]),  transition(':enter', [
                    query('@backdrop,@box', [
                      animateChild()
                    ])
                  ]),
                ]), trigger('box', [
                  transition(':leave', [
                    style({
                      transform: 'scale(1)'
                    }),
                    animate('100ms ease-out', style({
                      transform: 'scale(1.2)'
                    })),
                    animate('300ms ease-in', style({
                      transform: 'scale(0)'
                    }))
                  ]),
                  transition(':enter', [
                    style({
                      transform: 'scale(0.5)'
                    }),
                    animate('200ms ease-out', style({
                      transform: 'scale(1.2)'
                    })),
                    animate('100ms ease-out', style({
                      transform: 'scale(1)'
                    }))
                  ]),
                ]),
                trigger('backdrop', [
                  transition(':leave', [
                    style({
                      opacity: 1,
                    }),
                    animate('230ms ease-in', style({
                      opacity: 0,
                    }))
                  ]),
                  transition(':enter', [
                    style({
                      opacity: 0,
                    }),
                    animate('230ms ease-in', style({
                      opacity: 1,
                    }))
                  ]),
                ])
              ]
            })
export class ModaldetailsComponent implements OnInit {
 _modalgRef :  MatDialogRef<ModaldetailsComponent>
   _data: ModalData
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
}
