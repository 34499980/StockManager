import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Articulo } from '../arquitectura/class/Articulo';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
   }
saveStock(articulo : Articulo){
 
  this.http.post(environment.RestFullApi+'Stock',articulo).subscribe(res=> res,
                                                                    error => {return error})
}
   getStockByCode(code: String): Observable<any>{
     let result
    /* if(code=="0000000001"){
      result = [
        {
          Code: "0000000001",
          Price:"500",
          Name:"Iron Man",
          Brand:"DitoYs",
          Model: "rojo",
          Unity:5,
          Description: "Muñeco articulado con luces. Lleva dos pilas.",
          Image: '../../../../assets/ironman.png'
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
          Unity: '3',
          Description: "Muñeco articulado con luces. Lleva dos pilas.",
          Image: '../../../../assets/warmachine.jpg'
        }
      ]
     } */
     this.http.get(environment.RestFullApi+'Stock/'+code).subscribe(res => {
                                                                            return res
                                                                           },
                                                                           error => alert(error.message))
    
    return of(result)
  }
  getStock(code?: Number, name?: string, brand?: string, model?: string, sucursal?: string){
    let result
    this.http.get(environment.RestFullApi+'Stock/'+code).subscribe(res => {
                                                                            return res
                                                                          },
                                                                          error => alert(error.message))
    /* = [
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

    ]*/
    return of(result)
  }
 
  
 
}
