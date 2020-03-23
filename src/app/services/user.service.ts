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
                Password: "asd",
                Nombre:"Ariel",
                Apellido:"Brenman",
                DNI: "34499980",
                FechaNacimiento:"16/05/1989",
                FechaIngreso:"20/03/2020",
                Email: "aribrenman@gmail.com",
                Direccion: [
                    {
                        Calle:"av scalabrini Ortiz",
                        Piso: "6",
                        Depto: "D"
                    }
                ]
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
                 Direccion: "av scalabrini ortiz 2170 6D"
                }                          
            ]
           }
           
       ]
    }
        
       return of(usuarios);
      
    }
}
