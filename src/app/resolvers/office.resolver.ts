import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class OfficeResolver implements Resolve<any>
{
    private apiEndPoint: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {TicketService} _auth
     */
    constructor(
        private _httpClient: HttpClient,
        private _service: UserService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {       
        return this._service.getAllOffice();
    }
}
