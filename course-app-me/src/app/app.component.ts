import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'course-app-me';
  select = 'recipe';
  constructor(private authService: AuthService) {
  }
  selectedComp(select: string) {
    this.select = select;
  }
  ngOnInit() {
    this.authService.autoLogin();
  }
}
