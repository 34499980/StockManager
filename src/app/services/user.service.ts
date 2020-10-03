import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../arquitectura/class/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from './arquitectura.service';
import { map, catchError } from 'rxjs/operators';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private arquitecturaService: ArquitecturaService) { }
  handleError(value){
    try{
    let start = value.error.indexOf(':')+1
    let end = value.error.indexOf(' at ') - start
   
    }
    catch(ex){
      this.arquitecturaService.openDialog("Error","Se genero un error interno. Si persiste, comuniquise con el administrador.")
    }
    //return throwError(error);
    }
  
    getScreensByRule(): Observable<any> {        
    let screens  = [
       {
           Titulo:"Administracion",                
           SubTitulo: [
               {
                Titulo:"Usuarios"
               },
               {
                Titulo:"Perfil"
               },
               {
                Titulo:"Anulaciones"
               }
                           
           ]
       },
       {
           Titulo:"Sucursales",                
           SubTitulo: [
               {
                Titulo:"Movimientos"
               },
               {
                Titulo:"Ventas"
               },
               {
                Titulo:"Anular"
               },
               {
                Titulo:"Cambios/Devolución"
               }
                           
           ]
       },
       {
           Titulo:"Mercaderia",                
           SubTitulo: [
               {
                Titulo:"Stock"
               },
               {
                Titulo:"Despachos"
               }
                           
           ]
       }
       
   ]
   return of(screens);
  
    }
    getUsuarios(): Observable<any> {        
      
       return  this.http.get(environment.RestFullApi+'Usuario').pipe(map(res =>{return res},
                                                                error => {this.arquitecturaService.openDialog("Error!",error.message)}))
   
   return of(null);
  
    }
    getUsuariosByUserName(user: string): Observable<any> {
        return  this.http.get(environment.RestFullApi+'Usuario/'+user).pipe(map(res =>{return res},
            error => {this.arquitecturaService.openDialog("Error!",error.message)}))

            return of(null);

    }
    getUsuariosById(userIndex: String): Observable<any> {  
        let usuarios: any 
        if(userIndex!= null){      
        
        usuarios = [
           {
            Titulo:"Ariel Brenman",                
            Datos: [
                {
                 userName: "abrenman",
                 Password: "asd",
                 Nombre:"Ariel",
                 Apellido:"Brenman",
                 DNI: "34499980",
                 FechaNacimiento:"16/05/1989",
                 FechaIngreso:"20/03/2020",
                 Email: "aribrenman@gmail.com",
                 Direccion: "av scalabrini ortiz 2170 6D",
                 CodPostal: "1425"
                }                          
            ]
           }
           
       ]
    }
        
       return of(usuarios);
      
    }
    saveUsuario(user: Usuario): Observable<any>{
        let request =[{
            user: user
        }
        ]
        return  this.http.post(environment.RestFullApi+'Usuario',{user}).pipe(map(res =>{return res},
            error => {this.arquitecturaService.openDialog("Error!",error.message)}),
            catchError((err, caught)=> {
               this. handleError(err)
        return of(false);
})
)
    }
    getMovimientosRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: String, sucursal?: String ): Observable<any>{
        let rows = [
            {
                ID:'01',
                date: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                sucursal: '1',
                remito: 'Remito1202004021618'
            },
            {
                ID:'02',
                date: '01/04/2020',
                user: 'mpotap',
                total: '10000',
                sucursal: '1',
                remito: 'Remito1202004011618'
            },
            {
                ID:'03',
                date: '02/04/2020',
                user: 'abrenman',
                total: '5000',
                sucursal: '1',
                remito: 'Remito1202004011718'
            }
        ]


        return of(rows)
    }
    getAnularRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: String, sucursal?: String, ID?: Number ): Observable<any>{
        let rows = [
            {
                ID:'01',
                date: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                remito: 'Remito1202004021618',
                state: 'Finalizada'
            },
            {
                ID:'02',
                date: '01/04/2020',
                user: 'mpotap',
                total: '10000',               
                remito: 'Remito1202004011618',
                state: 'Finalizada'
            },
            {
                ID:'03',
                date: '02/04/2020',
                user: 'abrenman',
                total: '5000',               
                remito: 'Remito1202004011718',
                state: 'Finalizada'
            }
        ]


        return of(rows)
    }
    
    validateAdminUser(usuario: string, password: string): boolean
    {
        return true;
    }
    getAnulacionesRows(fechaDesde?: Date,fechaHasta?: Date,sucursal?: string,usuario?: string, Id?: number): Observable<any>{
        let Row = [
            {
                ID:'01',
                dateProcess: '02/04/2020',
                user: 'abrenman',
                total: '20000',
                sucursal: '1',
                remito: 'Remito1202004021618',
                dateAnnultmen: '07/04/2020'
            }
        ]

        return of(Row)
    }
    getAllSucursal(): Observable<any> {        
      
        return  this.http.get(environment.RestFullApi+'Sucursal').pipe(map(res =>{return res},
                                                                 error => {this.arquitecturaService.openDialog("Error!",error.message)}),
                                                                 catchError((err, caught)=> {
                                                                    this. handleError(err)
             return of(false);
            })
            )
       
    }
    getAllRules(): Observable<any> {        
      
        return  this.http.get(environment.RestFullApi+'States'+"/rules").pipe(map(res =>{return res},
                                                                 error => {this.arquitecturaService.openDialog("Error!",error.message)}),
                                                                 catchError((err, caught)=> {
                                                                    this. handleError(err)
             return of(false);
            })
            )
       
    }

   
}
  