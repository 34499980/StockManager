import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Articulo } from '../arquitectura/class/Articulo';
import { AuthenticationService } from './authentication.service';
import { ArquitecturaService } from './arquitectura.service';
import { map, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  http: HttpClient
  constructor(http: HttpClient,private authentication: AuthenticationService,private arquitecturaService: ArquitecturaService) {
    this.http = http
   }
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
saveStock(stock : Articulo){  
   
  let user = this.authentication.getSession()
  let request = [{
    stock: stock,
    user: user
  }]
  this.http.post(environment.RestFullApi+'Stock',{stock,user}).subscribe(res=> res,
    error => {return error})

  /*
  return this.http.post<any>(environment.RestFullApi+'Stock',{stock,user,},options).pipe(map(res => {return res}),
  catchError((err, caught)=>{
    this.handleError(err)
    return of(false);
    })
    )*/
  }
   getStockByCode(code: String): Observable<any>{
    return  this.http.get(environment.RestFullApi+'Stock/'+code).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
  getStock(code?: string, name?: string, brand?: string, model?: string, sucursal?: number){
    let query = " where "   
    query += "idsucursal:"+sucursal
    code == undefined || code == ""? query :query +=  " ; code:"+ code 
    name == undefined || name == ""? query :query +=  " ; name:"+ name 
    brand == undefined || brand == ""? query :query +=  " ; brand:"+ brand 
    model == undefined ||  model == ""? query:query +=  " ; model:"+ model 
   
   

    return  this.http.get(environment.RestFullApi+'Stock/'+ query).pipe(map(res =>{return res},
      error => {this.arquitecturaService.openDialog("Error!",error.message)}),
      catchError((err, caught)=> {
         this. handleError(err)
      return of(false);
        })
      )
  }
 
  
 
}
