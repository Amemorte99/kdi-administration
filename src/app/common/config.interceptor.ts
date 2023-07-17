import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;
@Injectable()
export class ConfigInterceptor implements HttpInterceptor {
  loginUrl = `${API_USERS_URL}/api/auth/login`;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes("/api/auth/login") 
    // || request.url.includes("/api/auth/register")
    // || request.url.includes("/api/offreurs/save")
    // || request.url.includes("api/typeOffreurs/libelle/")
    ) {
      request = request.clone({
        headers: request.headers.set('Access-Control-Allow-Origin', '*'),
      });
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      request = request.clone({
        headers: request.headers.set(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        ),
      });
    }
    else if ( request.url.includes("/api/uploads/save")){
      // alert("elseif3");
      request = request.clone({
        headers: request.headers.set('Access-Control-Allow-Origin', '*'),
      });
     
    }
    else {
      // alert("else");
      const token = JSON.parse(localStorage['userToken'])
      if (token) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization', `Bearer ${token}`
          ),
        });
      }

    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("event ---->>", event);
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        let data = {};

        data = {
          reason:
            (error && error.error ? error.error : '') +
            ' - ' +
            (error && error.message ? error.message : ''),
          status: error.status,
        };
        if (error.status == 500) {
          // this.sweetAlertService.showErrorAlert(
          //   "Warning !",
          //   "une erreur s'est produite , nous vous reviendrons plus tard "
          // );
        }

        // console.log("data: ", data);
        return throwError(() => error);
      })
    );
}
}
