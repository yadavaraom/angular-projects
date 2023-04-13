import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // console.log('Intersepter is called', request);
       // console.log(this.auth.tok());
        if (request.url === '/app/token') {
           return next.handle(request);
        }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.tok()}`
        }
      });
      return next.handle(request);
    }
}