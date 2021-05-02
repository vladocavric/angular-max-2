import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {environment} from '../../environments/environment'

export interface AuthResponseData {
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
  tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAutentification(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAutentification(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAutentification(email: string, id: string, token: string, tokenExpiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + tokenExpiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(tokenExpiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An Error occurred';
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Wrong email';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Wrong password';
        break;
    }
    return throwError(errorMsg);
  }
}
