import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { UserLogin } from '../users/UserLogin';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private http: HttpClient,private arquitecturaService: ArquitecturaService,private userLogin: UserLogin) { }
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
    let request = [{Origin: origen,
                    Destiny: destino,
                    IdUser: this.userLogin._userName}]
    return this.http.post<any>(environment.RestFullApi+'Dispatch',request,options).pipe(map(res => {return res}),
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
    let result
  
     result = [
       {
         Code: "0000000001",
         Price:"500",
         Name:"Iron Man",
         Brand:"DitoYs",
         Model: "rojo",
         Unity:5,
         Description: "Muñeco articulado con luces. Lleva dos pilas.",
         Image: '../../../../assets/ironman.png'
       },
    
       {
         Code: "0000000002",
         Price:"1000",
         Name:"War machine",
         Brand:"DitoYs",
         Model: "negro",
         Sucursal: "2",
         Unity: '3',
         Description: "Muñeco articulado con luces. Lleva dos pilas.",
         Image: '../../../../assets/warmachine.jpg'
       }
     ]
    

   
   return of(result)
  }
  getDespachoRows(): Observable<any>{
    let result = [
      {
        ID: "0000000001",
        datecreate:"30/04/2020",
        user:"abrenman",
        origin:"1",
        destiny: "2",
        state: "Despachado",
        datedespatched: '30/04/2020',
        daterecived: "",
        items: 20
      },
      {
        ID: "0000000002",
        datecreate:"30/04/2020",
        user:"MPotap",
        origin:"1",
        destiny: "2",
        state: "Recibido",
        datedespatched: '30/04/2020',
        daterecived: "30/04/2020",
        items: 50
      }
    ]


    return of(result)
  }
 
}
