import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  show = false;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private saveStorage: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
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

