import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthReturnData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  expirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    console.log(userData);
    const expirationDate = new Date(userData._tokenExpirationDate);
    const loadedUser = new User(userData.id, userData.email, userData._token, expirationDate);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = expirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  signup(email: string, password: string) {
    return this.http.post<AuthReturnData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDfLakz19FTzmiBuqe5jnOvjIMd2aBG08', {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthReturnData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDfLakz19FTzmiBuqe5jnOvjIMd2aBG08', {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(id: string, email: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(id, email, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Wrong email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password';
        break;
    }
    return throwError(errorMessage);
  }
}
