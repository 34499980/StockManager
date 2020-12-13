import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from '../../services/arquitectura.service';
import { User } from '../../models/user';


const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    // tslint:disable-next-line: no-construct
    public ErrorMessage = new String()
    constructor(private http: HttpClient,
                private arquitecturaService: ArquitecturaService ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }
      getSession(): any{
       return localStorage.getItem('user');
      }
    Autorization(value){
        this.loggedIn.next(true)
        localStorage.setItem('user', value.userName)
      return value
    }
    login(username: string, pass: string) {
      const user = {
        userName: username,
        password: pass
      }
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( map(res => {return this.Autorization(user)})
            )
    }
    logout() {
      this.loggedIn.next(false)
    }
}