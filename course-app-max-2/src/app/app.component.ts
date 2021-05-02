import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.authService.autoLogin();
        }
    }

}
