import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturacionService } from 'src/app/services/facturacion.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {  
  _rows : any
  _activatedRoute: ActivatedRoute
  _facturacionService: FacturacionService
  constructor(private activatedRoute: ActivatedRoute, facturacionService: FacturacionService) {
    this._activatedRoute = activatedRoute
    this._facturacionService = facturacionService
   }

  ngOnInit(): void {
    this._rows = this._facturacionService.rows
    //this._rows = JSON.parse();
  }

}
