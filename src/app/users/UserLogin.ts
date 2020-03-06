import { iUser } from './IUser'
import { Observable, of } from 'rxjs'

export class UserLogin implements  iUser{
  [x: string]: any
   
    _name: String
    _lastName: String
    _userName: String
    _password: String
    _rules: String

    getScreensByRule(): Observable<any> {        
        let screens  = [
           {
               Titulo:"Usuarios",                
               SubTitulos: [
                   {
                    titulo:"Administracion"
                   },
                   {
                       titulo:"Perfil"
                   }
                               
               ]
           },
           {
               Titulo:"Sucursales",                
               SubTitulos: [
                   {
                    titulo:"Movimientos"
                   },
                   {
                       titulo:"Ventas"
                   }
                               
               ]
           },
           {
               Titulo:"Mercaderia",                
               SubTitulos: [
                   {
                    titulo:"Stock"
                   }
                               
               ]
           }
           
       ]
       return of(screens);
      
   }
    
}
