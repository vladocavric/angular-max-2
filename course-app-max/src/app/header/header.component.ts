import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  // @Output() featureSelected = new EventEmitter<string>();
  isOpen = false;
  isAuthenticated = false;
  authSub: Subscription;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSelect(feature: string) {

    // this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
  this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

    onClose() {
        this.isOpen = false;
    }
}
