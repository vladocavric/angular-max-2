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

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMsg => {
            this.error = errorMsg;
            this.isLoading = false;
        });
        form.reset();
    }


    onErrorOk() {
        this.error = null;
    }
}
