import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServece} from '../auth.servece';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthServece) { }

  ngOnInit() {
  }

  onServerLoad(id) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: 1}, fragment: 'loading'});
  }

  onLogIn() {
    this.auth.logIn();
  }

  onLogOut() {
    this.auth.logOut();
  }
}
