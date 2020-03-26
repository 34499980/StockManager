import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  public getStockByCode(): Observable<any>{
    let stock = [
      {
        Code: "0000000001",
        Price:"10000",
        Name:"Iron Man",
        Brand:"DitoYs",
        Description: "Muñeco articulado con luces. Lleva dos pilas."
      }

    ]
    return of(stock)
  }
}
