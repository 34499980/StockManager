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
}
