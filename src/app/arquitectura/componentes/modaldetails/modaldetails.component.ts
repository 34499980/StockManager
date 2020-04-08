import { Component, OnInit } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>) {
    this._modalgRef = modalgRef
   }

  ngOnInit(): void {
  }
  close(){
    this._modalgRef.close()   
  }
}
