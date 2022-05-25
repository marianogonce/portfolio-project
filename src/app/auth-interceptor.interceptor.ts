import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/authService/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (!token) {
      return next.handle(request);
    }
    const headers = request.clone({
      headers: request.headers.set('Authorization', token),
    });
    return next.handle(headers);
  }
}
