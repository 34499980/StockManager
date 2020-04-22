import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

   getStockByCode(code: String): Observable<any>{
     let result
     if(code=="0000000001"){
      result = [
        {
          Code: "0000000001",
          Price:"500",
          Name:"Iron Man",
          Brand:"DitoYs",
          Model: "azul",
          Count:5,
          Description: "Muñeco articulado con luces. Lleva dos pilas."
        }
      ]
     }else{
      result = [
        {
          Code: "0000000002",
          Price:"1000",
          Name:"War machine",
          Brand:"DitoYs",
          Model: "negro",
          Sucursal: "2",
          Count: '3',
          Description: "Muñeco articulado con luces. Lleva dos pilas."
        }
      ]
     } 

    
    return of(result)
  }
  getStock(codigo?: Number, nombre?: string, marca?: string, modelo?: string, sucursal?: string){
    let stock = [
      {
        Code: "0000000001",
        Price:"500",
        Name:"Iron Man",
        Brand:"DitoYs",
        Model: "azul",
        Sucursal: "1",
        Count: '5'
      },
      {
        Code: "0000000002",
        Price:"1000",
        Name:"War machine",
        Brand:"DitoYs",
        Model: "negro",
        Sucursal: "2",
        Count: '3'
      }

    ]
    return of(stock)
  }
}
