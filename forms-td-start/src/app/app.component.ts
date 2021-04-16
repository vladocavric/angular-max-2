import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') submitForm: NgForm;
  defaultQuestion = 'pet';
  answer: string;
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    gender: '',
    secret: '',
    answer: ''
  };
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.submitForm.form.setValue({
      userData: {
        username: suggestedName,
        email: 'nesto@nesto.com'
      },
      secret: 'teacher',
      questionAnswer: 'nesto novo',
      gender: 'male'
    });
    this.submitForm.form.patchValue({userData: {username: suggestedName}});
  }

  // onSubmit(form: NgForm) {
  //   console.log(f.form.value)
  // }

  onSubmit() {
    // console.log(this.submitForm)
    // console.log(this.submitForm.form.controls.email.status)
    this.submitted = true;
    this.user.username = this.submitForm.value.userData.username;
    this.user.email = this.submitForm.value.userData.email;
    this.user.gender = this.submitForm.value.gender;
    this.user.secret = this.submitForm.value.secret;
    this.user.answer = this.submitForm.value.questionAnswer;
    this.submitForm.reset();
  }
}
