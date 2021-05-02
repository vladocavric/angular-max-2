import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<UserModel>(null);
  private expirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  setLogoutTimer(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration);
  }

  clertLogouttimer() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }
}
