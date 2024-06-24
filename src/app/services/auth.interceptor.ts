import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../authentification/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private autService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.autService.getToken();
    if (token) {
      const cloned = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
