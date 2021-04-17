import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  show = false;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private saveStorage: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log('user:' + user);
        console.log('!user:' + !user);
        console.log('!!user:' + !!user);
      });
  }

  onSaveData() {
    this.saveStorage.storeData();
  }

  onFetchData() {
    this.saveStorage.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onClickedOutside() {
    this.show = false;
  }
}

