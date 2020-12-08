import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from './arquitectura.service';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { navigation } from '../core/sidenav/navigation';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private arquitecturaService: ArquitecturaService) { }

    getScreens(): Observable<any> {
     const screen =  navigation
   return of(screen);
    }
    getUsuarios(): Observable<any> {
       return  this.http.get(environment.RestFullApi+'Usuario')
       .pipe(
           map(res => {
               return res
            })
       );
    }
    getUsuariosByUserName(user: string): Observable<any> {
        return  this.http.get(environment.RestFullApi+'Usuario/'+user)
        .pipe(
            map(res => {
            return res
            })
        );
    }
    getUsuariosById(userIndex: string): Observable<any> {

        if(userIndex!= null){
       const usuarios = [
           {
            Titulo:'Ariel Brenman',
            Datos: [
                {
                 userName: 'abrenman',
                 Password: 'asd',
                 Nombre:'Ariel',
                 Apellido:'Brenman',
                 DNI: '34499980',
                 FechaNacimiento:'16/05/1989',
                 FechaIngreso:'20/03/2020',
                 Email: 'aribrenman@gmail.com',
                 Direccion: 'av scalabrini ortiz 2170 6D',
                 CodPostal: '1425'
                }
            ]
           }
       ]
    }
       return of(null);
    }
    saveUsuario(user: Usuario): Observable<any>{
        return  this.http.post(environment.RestFullApi+'Usuario', user)
        .pipe(
            map(res => {
                return res
            })
        );
    }
    getMovimientosRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: string, sucursal?: string ): Observable<any>{
        const rows = [
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
    getAnularRows(fechaDesde?: Date, fechaHaasta?: Date, usuario?: string, sucursal?: string, ID?: number ): Observable<any>{
        const rows = [
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
        const Row = [
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
        return  this.http.get(environment.RestFullApi+'Sucursal')
        .pipe(
            map(res => {
            return res
            })
        );
    }
    getAllRules(): Observable<any> {
        return  this.http.get(environment.RestFullApi+'States'+'/rules')
        .pipe(
            map(res => {
            return res
            })
        );
    }
}
