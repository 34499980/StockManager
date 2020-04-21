import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  public rows = new Object;
  constructor() { }
  cancelRemito(ID: Number){
        
  }
  getMetodoPago(): Observable<any>
  {
  let result = [
    {
      Titulo: 'Efectivo'
    },
    {
      Titulo: 'Debtido'
    },
    {
      Titulo: 'Credito'
    }
  ]
  return of(result)
  }
  getCoutas(): Observable<any>{
    let result = [
      {
        Cuota: 1
      },
      {
        Cuota: 3
      },
      {
        Cuota: 6
      }
    ]
    return of(result)
  }
}
