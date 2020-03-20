import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
               }
                           
           ]
       },
       {
           Titulo:"Mercaderia",                
           SubTitulo: [
               {
                Titulo:"Stock"
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
                Nombre:"Ariel",
                Apellido:"Brenman",
                Edad:"30",
                FechaIngreso:"20/03/2020"
               }
              
                           
           ]
       },
       {
           Titulo:"Melisa Potap",                
           Datos: [
            {
                userName: "mpotap",
                Nombre:"Melisa",
                Apellido:"Potap",
                Edad:"26",
                FechaIngreso:"20/03/2020"
               }
                           
           ]
       }
       
   ]
   return of(usuarios);
  
    }
    getUsuariosById(userIndex: String): Observable<any> {        
        let usuarios  = [
           {
               Titulo:"Ariel Brenman",                
               Datos: [
                   {
                    userName: "abrenman",
                    Nombre:"Ariel",
                    Apellido:"Brenman",
                    Edad:"30",
                    FechaIngreso:"20/03/2020"
                   }                 
                               
               ]
           }
           
       ]
       return of(usuarios);
      
    }
}
