import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { DispatchFilter } from '../models/dispatchFilter.model';
import { Dispatch } from '../models/dispatch';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private http: HttpClient,
              private arquitecturaService: ArquitecturaService,
              private authentication: AuthenticationService) { }
  
  
  GetAllOfficesByFilter(filter: DispatchFilter): Observable<Dispatch[]> {
    return this.http.get<Dispatch[]>(environment.RestFullApi + 'dispatch')
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetAllDispatchFilter(filter: DispatchFilter): Observable<Dispatch[]> {
    return this.http.post<Dispatch[]>(environment.RestFullApi + 'dispatch/GetDispatchFilter', filter)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetDispatchById(id: number) {
    this.http.get(environment.RestFullApi + `dispatch/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  add(dispatch: Dispatch) {
    this.http.post(environment.RestFullApi + 'dispatch', dispatch)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  update(dispatch: Dispatch) {
    this.http.put(environment.RestFullApi + 'dispatch', dispatch)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  delete(id: number){
    this.http.delete(environment.RestFullApi + `dispatch/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
}
