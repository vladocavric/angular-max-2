import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request is on the way')
    console.log(req.url)
    const modifiedUrl = req.clone({headers: req.headers.append('auth', 'xyz')})
    return next.handle(modifiedUrl).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Response) {
        console.log('response data:')
        console.log(event.body)
      }
    }))
  }
}
