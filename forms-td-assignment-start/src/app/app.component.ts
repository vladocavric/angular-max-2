import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced';
  submitted = false;
  user = {
    username: '',
    password: '',
    subscription: ''
  };

  onSubmit() {
    console.log(this.form);
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.user.subscription = this.form.value.subscription;
    this.submitted = true;
    this.form.reset();
  }
}
