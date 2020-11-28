import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private artuitecturaService: ArquitecturaService
      ) {
      }
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>>{
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            this.artuitecturaService.openDialog('Error', error.error)
          return throwError(error.status);
        })
      )
  }
}