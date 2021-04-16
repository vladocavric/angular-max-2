import {Action} from '@ngrx/store';
import {UserModel} from '../user.model';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTO_LOGOUT = 'AUTO_LOGOUT';

export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: UserModel) {
  }
}
export class LogIn implements Action {
  readonly type = LOG_IN;
}
export class LogOut implements Action {
  readonly type = LOG_OUT;
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  constructor(public payload: UserModel) {
  }
}
export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}

export type AuthActions = SignUp | LogIn | LogOut | AutoLogin | AutoLogout;
