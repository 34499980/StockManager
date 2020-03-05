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
                value: 'Administracion'
            },{
                value:'Perfil'
            }
        ]
        return of(screens);
       
    }
    
}
