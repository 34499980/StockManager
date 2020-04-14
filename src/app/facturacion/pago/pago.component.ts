import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {  
  _rows : any
  _activatedRoute: ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute
   }

  ngOnInit(): void {
    this._rows = JSON.parse(this._activatedRoute.snapshot.queryParamMap.get('myArray'));
  }

}
