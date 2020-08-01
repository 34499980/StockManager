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
    let end = value.error.indexOf(' at ') - start
    this.arquitecturaService.openDialog("Error",value.substring(start,end))
    }
    catch(ex){
      this.arquitecturaService.openDialog("Error","Se genero un error interno. Si persiste, comuniquise con el administrador.")
    }
    //return throwError(error);
    }
  changeDespachoState(){
  
  }
  CreateDispatched(origen: String,destino:String): Observable<any>{    
    let dispatch: Dispatch = new Dispatch() 
   
    dispatch.Origin = origen
    dispatch.Destiny = destino
    let user = this.authentication.getSession()
    let request = [{
      dispatch: dispatch,
      user: user
    }]
    
    
    return this.http.post<any>(environment.RestFullApi+'Dispatch',{dispatch,user},options).pipe(map(res => {return res}),
    catchError((err, caught)=>{
      this.handleError(err)
      return of(false);
    })
)
  }
  createDispatched(): string{

    return "0000000009"
  }
  getDespachoDataRows(despacho: String): Observable<any>{
    return  this.http.get(environment.RestFullApi+'Dispatch/'+despacho).pipe(map(res =>{return res},
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
