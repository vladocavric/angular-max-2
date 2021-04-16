import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isActivated = false
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedEmitter.subscribe(data => {
      this.isActivated = data;

    })
  }
}
