import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserActivateService} from './user-activate.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription
  constructor(private userActivate: UserActivateService) {}

  ngOnInit() {
    this.activatedSub = this.userActivate.activateEmitter.subscribe(activated => {
      // console.log(activated)
      this.userActivated = activated;
    })
  }
  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
