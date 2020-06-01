import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Usuario } from '../arquitectura/class/usuario';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;   
    

    constructor(private http: HttpClient ) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
       
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): any { 
        try{ 
        let user: Usuario = new Usuario() 
        user.userName = username
        user.password = password     
        this.http.get(environment.RestFullApi+'/User/'+  JSON.stringify(user) )
            .subscribe(user => {
                            

                return user
            },
            error=>{return error});
        }catch(ex){
            throw ex;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}