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
 getColumnsGridAnular(): Observable<any>{
  let columns = [
    {
      header:"Id Transacción",
      field: "ID"
      
    },
    {
      header: "Fecha",
      field: "date"
    },
    {
      header: "Usuario",
      field: "user"
    },    
    {
      header: "Total",
      field: "total"
    },    
    {
      header: "Remito",
      field: "remito"
    },    
    {
      header: "Estado",
      field: "state"
    },    
    {
      header: "Anular",
      field: "Anular"
    }
  ]
  return of(columns)
 }
 getColumnsGridMovimientos(): Observable<any>{
  let columns = [
    {
      headerName:"ID",
      header:"id",
      field: "ID",
      sortable: true,
      filter: true,
      dataKey: 'ID'
      
    },
    {
      headerName:"Fecha",
      header:"Fecha",
      field: "date",
      sortable: true,
      filter: true,
      dataKey: 'date'
      
    },
    {
      headerName: "Usuario",
      header: "Usuario",
      field: "user",
      sortable: true,
      filter: true,
      dataKey : 'user'
    },
    {
      headerName: "Monto",
      header: "Monto",
      field: "total",
      sortable: true,
      filter: true,
      dataKey: 'total'
    },    
    {
      headerName: "Remito",
      header: "Remito",
      field: "remito",
      sortable: true,
      filter: true,
      dataKey: 'remito'
    },
    {
      headerName: "Sucursal",
      header: "Sucursal",
      field: "sucursal",
      sortable: true,
      filter: true,
      dataKey:'sucursal'
    }
  ]
  return of(columns)
 }


}
