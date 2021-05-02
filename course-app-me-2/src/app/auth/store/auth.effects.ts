import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../user.model';
import {AuthService} from '../auth.service';

// import {AuthResponseData} from '../auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
  const user = new UserModel(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Authenticate({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  });
};
const handleError = (errorRes: any) => {
  let errorMsg = 'Something went wrong';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMsg));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'This email is not registered';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'You entered wrong password';
      break;
    case 'EMAIL_EXISTS':
      errorMsg = 'This email is already in use';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }));
    })
  );
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }));
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (!userData) {
      return {type: 'DUMMY'};
    }
    const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.authService.setLogoutTimer(expirationDuration);
      return new AuthActions.Authenticate({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
        redirect: false
      });

    }
    return {type: 'DUMMY'};
  }));

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE, AuthActions.LOGOUT),
    tap((authSuccessAction: AuthActions.Authenticate) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    }));

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
    this.authService.clertLogouttimer();
    localStorage.removeItem('userData');
  }));

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }
}
