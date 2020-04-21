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
  _methods: any
  _cuotas: any
  _total: number
  _bCredito: boolean
  constructor(private activatedRoute: ActivatedRoute, facturacionService: FacturacionService) {
    this._activatedRoute = activatedRoute
    this._facturacionService = facturacionService
    
   }

  ngOnInit(): void {
    this._rows = this._facturacionService.rows
    this._facturacionService.getMetodoPago().subscribe(res => {this._methods = res})
    this._facturacionService.getCoutas().subscribe(res => {this._cuotas = res})
   this._total = this.calcularTotal(this._rows)
  }
  calcularTotal(rows: any): number{
    let result
  if(rows.length > 0){
    for(let index in rows){
      result = rows[index].SubTotal
    }
  }else{
    result = 0;
  }
  return result
}
 radioChange(value){
  if(value=="Efectivo"){
    this._bCredito = false
  }else{
    this._bCredito = true
  }
 }
}
