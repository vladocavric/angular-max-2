import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthAction from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isLoginMode) {
      this.store.dispatch(new AuthAction.LoginStart({email: form.value.email, password: form.value.password}));
    } else {
      this.store.dispatch(new AuthAction.SignupStart({email: form.value.email, password: form.value.password}));
    }
    form.reset();
  }


  onRemoveError() {
    this.store.dispatch(new AuthAction.ClearError());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
