import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        ClickOutsideModule,
        SharedModule,
        CoreModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
