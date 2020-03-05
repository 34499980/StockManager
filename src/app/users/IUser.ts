import { Observable } from 'rxjs';

 export interface iUser{
     getScreensByRule(): Observable<any>;
     
}