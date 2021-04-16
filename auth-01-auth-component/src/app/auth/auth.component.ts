import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthReturnData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(form.value);
    this.isLoading = true;
    let authObservable: Observable<AuthReturnData>;
    if (this.isLoginMode) {
      authObservable = this.authService.login(form.value.email, form.value.password);
    } else {
      authObservable = this.authService.signup(form.value.email, form.value.password);
    }
    authObservable.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.error = null;
      this.router.navigate(['/recipes']);

    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    form.reset();
  }

  onErrorOk() {
    this.error = null;
  }
}
