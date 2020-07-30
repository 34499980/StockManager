import { iUser } from './IUser'
import { Observable, of } from 'rxjs'
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
  })
export class UserLogin implements  iUser{   
 
   
    public _name: String
    public _lastName: string
    public _userName = new String()
    public _password = new String()
    public _rules: String
    public _sucursal: String
    private _userService

    constructor(private userService: UserService){
        this._userService = userService;
    }
    getScreensByRule(): Observable<any> {
      return  this._userService.getScreensByRule();
    }
    getUsuarios(): Observable<any>{
        return  this._userService.getUsuarios();
    }
    getUsuariosById(userIndex: String): Observable<any> {
        return  this._userService.getUsuariosById();
    }
}
