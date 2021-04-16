import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
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
      observableAuth = this.authService.login(form.value.email, form.value.password);
    } else {
      observableAuth = this.authService.signup(form.value.email, form.value.password);
    }
    observableAuth.subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.router.navigate(['../recipes']);

    }, errorMsg => {
      this.error = errorMsg;
      this.isLoading = false;
    });
    // console.log(form.value);
    form.reset();
  }


  onRemoveError() {
    this.error = null;
  }
}
