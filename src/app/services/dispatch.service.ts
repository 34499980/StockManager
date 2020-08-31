import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { UserLogin } from '../users/UserLogin';
import { AuthenticationService } from './authentication.service';
import { Usuario } from '../arquitectura/class/usuario';
import { Dispatch } from '../arquitectura/class/Dispatch';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private http: HttpClient,private arquitecturaService: ArquitecturaService,private authentication: AuthenticationService) { }
  handleError(value){
    try{
    let start = value.error.indexOf(':')+1
    let end = value.error.indexOf(' at ') 
    this.arquitecturaService.openDialog("Error",value.error.substring(start,end))
    }
    catch(ex){
      this.arquitecturaService.openDialog("Error","Se genero un error interno. Si persiste, comuniquise con el administrador.")
    }
    //return throwError(error);
    }
  geteDespachoState(){
    return  this.http.get(environment.RestFullApi+'States/'+"dispatch").pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  CreateDispatched(origen: String,destino:String): Observable<any>{    
    let dispatch: Dispatch = new Dispatch() 
   
    dispatch.Origin = origen
    dispatch.Destiny = destino
    let user = this.authentication.getSession()   
   
    
    
    return this.http.post<any>(environment.RestFullApi+'Dispatch',{dispatch,user},options).pipe(map(res => {return res}),
    catchError((err, caught)=>{
      this.handleError(err)
      return of(false);
    })
)
  }

  getDespacho(despacho: String): Observable<any>{
    return  this.http.get(environment.RestFullApi+'Dispatch/'+despacho).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  updateDespacho(dispatch){
    let user = this.authentication.getSession()
    return  this.http.put<any>(environment.RestFullApi+'Dispatch/'+dispatch.code,{dispatch,user}).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  getDespachoRows(): Observable<any>{
    return  this.http.get(environment.RestFullApi+'Dispatch').pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
 
}
