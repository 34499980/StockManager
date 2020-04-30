import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../arquitectura/componentes/dialogMessage/dialogMessage.component';

@Injectable({
  providedIn: 'root'
})
export class ArquitecturaService {
 _dialog: MatDialog
  constructor(dialog: MatDialog) {
    this._dialog = dialog
   }
  getCamposPerfil(): Observable<any> {
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
 getColumnsGridAnuladas(): Observable<any>{
  let columns = [
    {
      headerName:"ID",
      header:"id",
      field: "ID",
      sortable: true,
      filter: true,
      dataKey: 'ID',
      width: 100   
      
      
    },
    {
      headerName:"Fecha proceso",
      header:"Fecha proceso",
      field: "dateProcess",
      sortable: true,
      filter: true,
      dataKey: 'dateProcess',
      width: 150   
      
    },
    {
      headerName: "Usuario",
      header: "Usuario",
      field: "user",
      sortable: true,
      filter: true,
      dataKey : 'user',
      width: 150   
    },
    {
      headerName: "Monto",
      header: "Monto",
      field: "total",
      sortable: true,
      filter: true,
      dataKey: 'total',
      width: 150 
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
    },
    {
      headerName:"Fecha anulación",
      header:"Fecha anulación",
      field: "dateAnnultmen",
      sortable: true,
      filter: true,
      dataKey: 'dateAnnultmen',
      width: 150   
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
      dataKey: 'ID',
      width: 100   
      
    },
    {
      headerName:"Fecha",
      header:"Fecha",
      field: "date",
      sortable: true,
      filter: true,
      dataKey: 'date',
      width: 150   
      
    },
    {
      headerName: "Usuario",
      header: "Usuario",
      field: "user",
      sortable: true,
      filter: true,
      dataKey : 'user',
      width: 150   
    },
    {
      headerName: "Monto",
      header: "Monto",
      field: "total",
      sortable: true,
      filter: true,
      dataKey: 'total',
      width: 150   
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
 getColumnsGridStock(): Observable<any>{
  let columns = [
    {
      headerName:"ID",
      header:"id",
      field: "ID",
      sortable: true,
      filter: true,
      dataKey: 'Code',
      width: 100   
      
    },
    {
      headerName:"Nombre",
      header:"Nombre",
      field: "name",
      sortable: true,
      filter: true,
      dataKey: 'Name',
      width: 150   
      
    },
    {
      headerName: "Marca",
      header: "Brand",
      field: "brand",
      sortable: true,
      filter: true,
      dataKey : 'Bran',
      width: 150   
    },
    {
      headerName: "Modelo",
      header: "Model",
      field: "model",
      sortable: true,
      filter: true,
      dataKey: 'Model',
      width: 150   
    },    
    {
      headerName: "Sucursal",
      header: "Sucursal",
      field: "sucursal",
      sortable: true,
      filter: true,
      dataKey:'Sucursal'
    },    
    {
      headerName: "Cantidad",
      header: "Cantidad",
      field: "Count",
      sortable: true,
      filter: true,
      dataKey:'Count'
    },    
    {
      headerName: "Detalles",
      header: "Detalles",
      field: "Details",
      sortable: true,
      filter: true,
      dataKey:'Details'
    }
  ]
  return of(columns)
 }
 getDespachoColumns(): Observable<any>{
  let result = [
    {
      headerName:"ID",
      header:"ID",
      field: "ID",
      sortable: true,
      filter: true,
      dataKey: 'Code',
      width: 10   
    },
    {
     headerName:"FECHA CREACION",
     header:"FECHA CREACION",
     field: "datecreate",
     sortable: true,
     filter: true,
     dataKey: 'datecreate',
     width: 200   
    },
    {
      headerName:"USUARIO",
      header:"USUARIO",
      field: "user",
      sortable: true,
      filter: true,
      dataKey: 'user',
      width: 200   
     },
     {
      headerName:"ORIGEN",
      header:"ORIGEN",
      field: "origin",
      sortable: true,
      filter: true,
      dataKey: 'origin',
      width: 200   
     },
     {
      headerName:"DESTINO",
      header:"DESTINO",
      field: "destiny",
      sortable: true,
      filter: true,
      dataKey: 'destiny',
      width: 200   
     },
     {
      headerName:"ESTADO",
      header:"ESTADO",
      field: "state",
      sortable: true,
      filter: true,
      dataKey: 'state',
      width: 50   
     },
     {
      headerName:"FECHA DESPACHADO",
      header:"FECHA DESPACHADO",
      field: "datedispatched",
      sortable: true,
      filter: true,
      dataKey: 'datedispatched',
      width: 200   
     },
     {
      headerName:"FECHA RECIBIDO",
      header:"FECHA RECIBIDO",
      field: "datereceived",
      sortable: true,
      filter: true,
      dataKey: 'datereceived',
      width: 200   
     }
     ,
     {
      headerName:"Bultos",
      header:"Bultos",
      field: "items",
      sortable: true,
      filter: true,
      dataKey: 'items',
      width: 200   
     }
  ]

  return of(result)
 }
 getDespachoColumnsData(): Observable<any>{
  let result = [{
    headerName:"Code",
    header:"Code",
    field: "Code",
    sortable: true,
    filter: true,
    dataKey: 'Code',
    width: 100   
  },
  {
   headerName:"Nombre",
   header:"Name",
   field: "Name",
   sortable: true,
   filter: true,
   dataKey: 'Name',
   width: 100   
  },
  {
    headerName:"Marca",
    header:"Brand",
    field: "Brand",
    sortable: true,
    filter: true,
    dataKey: 'Brand',
    width: 100   
   },
   {
    headerName:"Modelo",
    header:"Model",
    field: "Model",
    sortable: true,
    filter: true,
    dataKey: 'Model',
    width: 100   
   },
   {
    headerName:"Unidades",
    header:"Unity",
    field: "Unity",
    sortable: true,
    filter: true,
    dataKey: 'Unity',
    width: 100   
   }]

  return of(result)
 }
 openDialog(title: string, text: string){
  const dialogRef = this._dialog.open(DialogMessageComponent, {
    disableClose: true,
    data : {_title: title, _text: text}
  });

 dialogRef.afterClosed().subscribe(result => {
   if(result == true){
    
   }
 });
}

}
