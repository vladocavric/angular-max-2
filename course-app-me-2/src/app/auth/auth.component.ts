import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscribable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {
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
    let observableAuth: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      // observableAuth = this.authService.login(form.value.email, form.value.password);
      this.store.dispatch(new AuthAction.LoginStart({email: form.value.email, password: form.value.password}));
    } else {
      // observableAuth = this.authService.signup(form.value.email, form.value.password);
      this.store.dispatch(new AuthAction.SignupStart({email: form.value.email, password: form.value.password}));
    }

    // observableAuth.subscribe(data => {
    //   console.log(data);
    //   this.isLoading = false;
    //   this.router.navigate(['../recipes']);
    //
    // }, errorMsg => {
    //   this.error = errorMsg;
    //   this.isLoading = false;
    // });
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
