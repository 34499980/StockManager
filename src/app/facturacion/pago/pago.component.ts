import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturacionService } from 'src/app/services/facturacion.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {  
  _rowsOutPut : any
  _rowsInPut : any
  _activatedRoute: ActivatedRoute
  _facturacionService: FacturacionService
  _methods: any
  _cuotas: any
  _totalOutPut: number
  _totalInPut: number
  _total: number
  _bCredito: boolean
  constructor(private activatedRoute: ActivatedRoute, facturacionService: FacturacionService) {
    this._activatedRoute = activatedRoute
    this._facturacionService = facturacionService
    
   }

  ngOnInit(): void {
    this._rowsOutPut = this._facturacionService.rows
    this._rowsInPut = this._facturacionService.rowsDevolucion
    this._facturacionService.getMetodoPago().subscribe(res => {this._methods = res})
    
   this._totalOutPut = this.calcularTotal(this._rowsOutPut)
   this._totalInPut = this.calcularTotal(this._rowsInPut)
   this._total = this._totalOutPut  -  this._totalInPut 
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
   switch(value){
    case 'Efectivo':
    this._bCredito = false
    break;
    case 'Debito':
    this._bCredito = true
    this._facturacionService.getCoutas(value).subscribe(res => {this._cuotas = res})
    break;
    case 'Credito':
    this._bCredito = true
    if(this._total < 0)
    value = 'Debito'
    this._facturacionService.getCoutas(value).subscribe(res => {this._cuotas = res})
    break;
   }
 
 }
}
