import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquitecturaService {

  constructor() { }
  getCampos(): Observable<any> {
    let param = [
      {
        param:"userName",
        type: "text"
      },
      {
        param:"Password",
        type: "password"
      },      
      {
        param:"Nombre",
        type: "text"
      },
      {
        param: "Apellido",
        type: "text"
      },
      {
        param: "FechaNacimiento",
        type: "date"
      },
      {
        param: "FechaIngreso",
        type: "date"
      },
      {
        param: "Email",
        type: "text"
        
      },
      {
        param: "Direccion",
        type: "text",       
      }
    ]
    return of(param)
  }
 

}
