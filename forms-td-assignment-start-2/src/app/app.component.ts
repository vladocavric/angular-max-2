import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  default = this.subscriptions[1];
  user = {
    email: '',
    sub: '',
    pass: ''
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.user.email = form.value.email;
    this.user.sub = form.value.sub;
    this.user.pass = form.value.password;
    // this.
  }
}
