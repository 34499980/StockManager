import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { Usuario } from '../arquitectura/class/usuario';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from './arquitectura.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { PageLoginComponent } from '../users/pagelogin/pagelogin.component';
import { exception } from 'console';

const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>; 
    _arquitecturaService: ArquitecturaService  
    public ErrorMessage = new String()

    

    constructor(private http: HttpClient,private arquitecturaService: ArquitecturaService ) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this._arquitecturaService = arquitecturaService
       
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }
      get isLogged() {
        return this.logged.asObservable();
      }
    Autorization(value){
      if(Boolean(Number(value))){
        this.loggedIn.next(true)
        this.logged.next(false)
      }
      return value
    }
    handleError(value){
      try{
      let start = value.error.indexOf(':')+1
      let end = value.error.indexOf(' at ') - start
      this.ErrorMessage = value.error.substr(start,end)}
      catch(ex){
        this.arquitecturaService.openDialog("Error","Se genero un error interno. Si persiste, comuniquise con el administrador.")
      }
      //return throwError(error);
      }
    login(username: string, password: string) { 
        let result: Observable<any>
        let user: Usuario = new Usuario() 
        user.userName = username
        user.Password = password  
     
       
   
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( map(res => {return this.Autorization(res)}),
            catchError((err, caught)=> {
             this. handleError(err)
             return of(false);
            })
            )
       
    }

  
    logout() {
      this.loggedIn.next(false)
        this.logged.next(true)
        
    
    }
}