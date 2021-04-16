import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }
}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {

      }
    return next.handle(req);
    })
  }

}
