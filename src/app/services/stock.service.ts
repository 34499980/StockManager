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
 
  getDespachoRows(): Observable<any>{
    let result = [
      {
        ID: "0000000001",
        datecreate:"30/04/2020",
        user:"abrenman",
        origin:"1",
        destiny: "2",
        state: "Despachado",
        datedespatched: '30/04/2020',
        daterecived: "",
        items: 20
      },
      {
        ID: "0000000002",
        datecreate:"30/04/2020",
        user:"MPotap",
        origin:"1",
        destiny: "2",
        state: "Recibido",
        datedespatched: '30/04/2020',
        daterecived: "30/04/2020",
        items: 50
      }
    ]


    return of(result)
  }
  getDespachoDataRows(despacho: String): Observable<any>{
    let result
  
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
       },
    
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
    

   
   return of(result)
  }
  changeDespachoState(despacho: String){

  }
  updateDataByDispatched(despacho: string){

  }
  createDispatched(): string{

    return "0000000009"
  }
}
