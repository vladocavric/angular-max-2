import {Action} from '@ngrx/store';
import * as AuthActions from 'auth.actions';

export function authReducer(
  state: State = {}, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return {};
    case AuthActions.LOG_OUT:
      return {};
    case AuthActions.AUTO_LOGIN:
      return {};
    case AuthActions.AUTO_LOGOUT:
      return {};
  }
}

