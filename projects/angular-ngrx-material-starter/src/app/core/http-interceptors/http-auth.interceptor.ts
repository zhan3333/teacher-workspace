import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.startsWith('http') ||
      request.url.indexOf('/i18n/') !== -1
    ) {
      return next.handle(request);
    }
    const newReq = request.clone({
      // headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken()),
      url: environment.api + request.url
    });
    return next.handle(newReq);
  }
}
