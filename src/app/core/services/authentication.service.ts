import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from '../../services/arquitectura.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { DomSanitizer } from '@angular/platform-browser';


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
                private arquitecturaService: ArquitecturaService,
                private router: Router,
                private sanitizer: DomSanitizer ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }     
      getSession(): any{
       return localStorage.getItem('user');
      }
      getCurrentRole(): any{
        return localStorage.getItem('roleId');
       }
       getCurrentCountry(): any{
        return localStorage.getItem('idCountry');
       }
       getCurrentOffice(): any{
        return localStorage.getItem('idOffice');
       }
       getCurrentImage = () =>{       
        
         return localStorage.getItem('file');
      
       }
    Autorization(value: User){ 
           
        this.loggedIn.next(true)
        localStorage.setItem('user', value.userName)
        localStorage.setItem('roleId', value.idRole.toString())
        localStorage.setItem('idCountry', value.idCountry.toString())
        localStorage.setItem('idOffice', value.idOffice.toString())
        if(value.file)
        localStorage.setItem('file', value.file)
        this.setAuthorization(value);
      return value
    }
    login(username: string, pass: string) {
      const user = {
        userName: username,
        password: pass
      };
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( map(res => {return this.Autorization(res as User)})
            )
    }
    logout() {           
      this.loggedIn.next(false);
      this.router.navigate([AppRouting.Login]);
    }
    getImageByUser(name: string): Observable<string>{
      return this.http.get<string>(environment.RestFullApi + 'Authentication/' + name)
      .pipe(
        map(
          res => {return res}
        )
      )
    }
    setAuthorization(user: User) {
      return this.http.post(environment.RestFullApi+'Authentication/SetAuthorization', user,options).subscribe();
     
      
    }
}