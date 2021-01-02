import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { AuthenticationService } from '../core/services/authentication.service';
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
  handleError(value){
    try{
    const start = value.error.indexOf(':')+1
    const end = value.error.indexOf(' at ');
    this.arquitecturaService.openDialog('Error', value.error.substr(start,end))
    }
    catch(ex){
      this.arquitecturaService.openDialog('Error','Se genero un error interno. Si persiste, comuniquise con el administrador.')
    }
    // return throwError(error);
    }
  GetDispatchStates(){
    return  this.http.get(environment.RestFullApi+'GetAllRoles/GetDispatchState').pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog('Error!',error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  CreateDispatch(origen: number, destino: number): Observable<any>{
    const user= this.authentication.getSession();
    const dispatch = {
    origin: origen,
    destiny: destino
    };
    return this.http.post<any>(environment.RestFullApi+'Dispatch',{dispatch,user}, options).pipe(map(res => {return res}),
    catchError((err, caught)=>{
      this.handleError(err)
      return of(false);
    })
)
  }

  GetDispatchById(dispatch: string): Observable<any>{
    const user = this.authentication.getSession();
    const request = {
      // tslint:disable-next-line: object-literal-shorthand
      dispatch : dispatch
    }
    return  this.http.get(environment.RestFullApi+'Dispatch/'+ JSON.stringify(request)).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog('Error!',error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  UpdateDispatch(dispatch){
    const user = this.authentication.getSession()
    return  this.http.put<any>(environment.RestFullApi+'Dispatch/'+dispatch.code,{dispatch,user}).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog('Error!',error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
 GetAllDispatchByOffice(): Observable<any>{
  const user = this.authentication.getSession()
   const request = {
    UserName : user
   }

    return  this.http.get(environment.RestFullApi+'Dispatch/'+ JSON.stringify(request)).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog('Error!',error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
}
