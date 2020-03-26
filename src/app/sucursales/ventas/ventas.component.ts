import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  _articule: Articulo = new Articulo
  _searchCode: String
  _stockService: StockService
  constructor(stockService: StockService) {
    this._stockService = stockService
   }

  ngOnInit(): void {
  }
  cargarCodigo(){
    if(this._searchCode.length == 10){
      this.searchArticulo()
    }
  }
  searchArticulo(){
    this._stockService.getStockByCode().subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
      }
    }
    )
   
  }
 
}
