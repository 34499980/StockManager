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
           Titulo:"Usuarios",                
           SubTitulo: [
               {
                Titulo:"Administracion"
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
}
