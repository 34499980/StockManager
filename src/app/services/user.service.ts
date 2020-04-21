import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../arquitectura/class/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
    getScreensByRule(): Observable<any> {        
    let screens  = [
       {
           Titulo:"Administracion",                
           SubTitulo: [
               {
                Titulo:"Usuarios"
               },
               {
                Titulo:"Perfil"
               },
               {
                Titulo:"Anulaciones"
               }
                           
           ]
       },
       {
           Titulo:"Sucursales",                
           SubTitulo: [
               {
                Titulo:"Movimientos"
               },
               {
                Titulo:"Ventas"
               },
               {
                Titulo:"Anular"
               },
               {
                Titulo:"Cambios/Devolución"
               }
                           
           ]
       },
       {
           Titulo:"Mercaderia",                
           SubTitulo: [
               {
                Titulo:"Stock"
               },
               {
                Titulo:"Despachos"
               }
                           
           ]
       }
       
   ]
   return of(screens);
  
    }
    getUsuarios(): Observable<any> {        
    let usuarios  = [
       {
           Titulo:"Ariel Brenman",                
           Datos: [
               {
                userName: "abrenman",
                Password: "asd",
                Nombre:"Ariel",
                Apellido:"Brenman",
                DNI: "34499980",
                FechaNacimiento:"16/05/1989",
                FechaIngreso:"20/03/2020",
                Email: "aribrenman@gmail.com",
                Direccion: "av scalabrini ortiz 6D",
                CodPostal: "1425"
                 }                          
                ]
       },
       {
           Titulo:"Melisa Potap",                
           Datos: [
            {
                userName: "mPotap",
                Password: "asd",
                Nombre:"Melisa",
                Apellido:"Potap",
                DNI: "37805059",
                FechaNacimiento:"10/07/1992",
                FechaIngreso:"20/03/2020",
                Email: "melipotap@gmail.com",
                Direccion: "av scalabrini ortiz 6D",
                CodPostal: "1425"
               
               }
                           
           ]
       }
       
   ]
   return of(usuarios);
  
    }
    getUsuariosById(userIndex: String): Observable<any> {  
        let usuarios: any 
        if(userIndex!= null){      
        
        usuarios = [
           {
            Titulo:"Ariel Brenman",                
            Datos: [
                {
                 userName: "abrenman",
                 Password: "asd",
                 Nombre:"Ariel",
                 Apellido:"Brenman",
                 DNI: "34499980",
                 FechaNacimiento:"16/05/1989",
                 FechaIngreso:"20/03/2020",
                 Email: "aribrenman@gmail.com",
                 Direccion: "av scalabrini ortiz 2170 6D",
                 CodPostal: "1425"
                }                          
            ]
           }
           
       ]
    }
        
       return of(usuarios);
      
    }
    saveUsuario(user: Usuario){
        
    }
    getMovimientosRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: String, sucursal?: String ): Observable<any>{
        let rows = [
            {
                ID:'01',
                date: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                sucursal: '1',
                remito: 'Remito1202004021618'
            },
            {
                ID:'02',
                date: '01/04/2020',
                user: 'mpotap',
                total: '10000',
                sucursal: '1',
                remito: 'Remito1202004011618'
            },
            {
                ID:'03',
                date: '02/04/2020',
                user: 'abrenman',
                total: '5000',
                sucursal: '1',
                remito: 'Remito1202004011718'
            }
        ]


        return of(rows)
    }
    getAnularRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: String, sucursal?: String, ID?: Number ): Observable<any>{
        let rows = [
            {
                ID:'01',
                date: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                remito: 'Remito1202004021618',
                state: 'Finalizada'
            },
            {
                ID:'02',
                date: '01/04/2020',
                user: 'mpotap',
                total: '10000',               
                remito: 'Remito1202004011618',
                state: 'Finalizada'
            },
            {
                ID:'03',
                date: '02/04/2020',
                user: 'abrenman',
                total: '5000',               
                remito: 'Remito1202004011718',
                state: 'Finalizada'
            }
        ]


        return of(rows)
    }
    
    validateAdminUser(usuario: string, password: string): boolean
    {
        return true;
    }
    getAnulacionesRows(fechaDesde?: Date,fechaHasta?: Date,sucursal?: string,usuario?: string, Id?: number): Observable<any>{
        let Row = [
            {
                ID:'01',
                dateProcess: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                sucursal: '1',
                remito: 'Remito1202004021618',
                dateAnnultmen: '07/04/2020'
            }
        ]

        return of(Row)
    }
   
}
  