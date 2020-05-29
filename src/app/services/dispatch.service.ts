import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor() { }
  changeDespachoState(despacho: String){

  }
  updateDataByDispatched(despacho: string){

  }
  createDispatched(): string{

    return "0000000009"
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
 
}
