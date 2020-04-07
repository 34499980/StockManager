import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Component({
  selector: 'app-mercaderia',
  templateUrl: './mercaderia.component.html',
  styleUrls: ['./mercaderia.component.css']
})
export class MercaderiaComponent implements OnInit {
  _rowData: any[] = []
  _columns: any[] = []
  _usuario: any
  _nombre: any
  _codigo: any
  _modelo: any
  _sucursal: any
  _marca: any
  _visible: boolean = false
  _stockService: StockService
  _arquitecturaService: ArquitecturaService
  constructor(stockService: StockService,arquitecturaService: ArquitecturaService) { 
    this._stockService = stockService
    this._arquitecturaService = arquitecturaService
  }

  ngOnInit(): void {
    this._arquitecturaService.getColumnsGridStock().subscribe(res => {this._columns = res})
  }
  searchStock(){
    this._stockService.getStock().subscribe(res => {
                                                this._rowData = res,
                                                this._visible = true
                                               })
  }

}
