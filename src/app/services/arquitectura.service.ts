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
      },
      {
        param: "CodPostal",
        type: "text"
      }
    ]
    return of(param)
  }
 getColumnsGridVentas(): Observable<any>{
  let columns = [
    {
      header:"Codigo",
      dataKey: "Code"
      
    },
    {
      header: "Nombre",
      dataKey: "Name"
    },
    {
      header: "Marca",
      dataKey: "Brand"
    },    
    {
      header: "Modelo",
      dataKey: "Model"
    },
    {
      header: "Precio",
      dataKey: "Price"
    },
    {
      header: "Unidades",
      dataKey: "Unity"
    },
    {
      header: "SubTotal",
      dataKey: "SubTotal"
    },
    {
      header: " ",
      dataKey: "delete"
    }
  ]
  return of(columns)
 }
 getColumnsGridMovimientos(): Observable<any>{
  let columns = [
    {
      headerName:"Fecha",
      field: "date",
      sortable: true,
      filter: true
      
    },
    {
      headerName: "Usuario",
      field: "user",
      sortable: true,
      filter: true
    },
    {
      headerName: "Monto",
      field: "total",
      sortable: true,
      filter: true
    },    
    {
      headerName: "Remito",
      field: "remito",
      sortable: true,
      filter: true
    },
    {
      headerName: "Sucursal",
      field: "sucursal",
      sortable: true,
      filter: true
    }
  ]
  return of(columns)
 }


}
