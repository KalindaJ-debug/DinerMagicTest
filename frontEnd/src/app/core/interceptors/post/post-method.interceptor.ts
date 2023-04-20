import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostMethodInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method == "POST" || request.method == "PUT" || request.method == "DELETE" || request.method == "PATCH")
    {
      const updatedRequest = request.clone({
        headers: request.headers.append('content-type', 'application/json')
      })

      return next.handle(updatedRequest);
    }
    
    return next.handle(request);
  }
}
