import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from './arquitectura.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { Usuario } from '../models/usuario';


const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;
    // tslint:disable-next-line: no-construct
    public ErrorMessage = new String()
    constructor(private http: HttpClient,
                private arquitecturaService: ArquitecturaService ) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }
      get isLogged() {
        return this.logged.asObservable();
      }
      getSession(): any{
       return localStorage.getItem('user');
      }
    Autorization(value){
        this.loggedIn.next(true)
        this.logged.next(false)
        localStorage.setItem('user', value.userName)
      return value
    }
    handleError(value){
      try{
      const start = value.error.indexOf(':')+1
      const end = value.error.indexOf(' at ') - start
      this.ErrorMessage = value.error.substr(start,end)}
      catch(ex){
        this.arquitecturaService.openDialog('Error','Se genero un error interno. Si persiste, comuniquise con el administrador.')
      }
      // return throwError(error);
      }
    login(username: string, pass: string) {
      const user = {
        userName: username,
        password: pass
      }
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( map(res => {return this.Autorization(user)}),
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