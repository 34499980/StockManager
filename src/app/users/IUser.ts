import { Observable } from 'rxjs';

 export interface iUser{
     getScreensByRule(): Observable<any>;
     getUsuarios(): Observable<any>;
     getUsuariosById(userIndex: String): Observable<any>;
}