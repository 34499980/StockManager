import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { Usuario } from '../arquitectura/class/usuario';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from './arquitectura.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { PageLoginComponent } from '../users/pagelogin/pagelogin.component';

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
    }
    handleError(error: HttpErrorResponse){
    
      return throwError(error);
      }
    login(username: string, password: string) { 
        let result: Observable<any>
        let user: Usuario = new Usuario() 
        user.userName = username
        user.Password = password  
     
       
   
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( catchError((err: HttpErrorResponse ) => {return '0';}),map(res =>  {this.Autorization(res)
                              return res})
               
                )
                    

        
                
       
    }

  
    logout() {
      this.loggedIn.next(false)
        this.logged.next(true)
        
    
    }
}