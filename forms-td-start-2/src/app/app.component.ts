import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    mail: '',
    secret: '',
    answer: '',
    gender: ''
  };
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: '',
    //   questionAnswer: '',
    //   gender: ''
    // });
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.user.username = this.form.value.userData.username;
    this.user.mail = this.form.value.userData.email;
    this.user.secret = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;
    this.form.reset();
  }
}
