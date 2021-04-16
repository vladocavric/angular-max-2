import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import {StoreModule} from '@ngrx/store';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClickOutsideModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
