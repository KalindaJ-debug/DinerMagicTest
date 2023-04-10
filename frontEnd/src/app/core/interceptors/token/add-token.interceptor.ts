import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('user') || request.url.includes('logout'))
    {
      const token = localStorage.getItem('token')!.toString();

      const updatedRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + token)
      })

      return next.handle(updatedRequest);
    }

    return next.handle(request);
  }
}
