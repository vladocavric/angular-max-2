import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {IngredientModel} from './shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'course-app-me';
  select = 'recipe';
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>
             ) {
  }
  selectedComp(select: string) {
    this.select = select;
  }
  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
