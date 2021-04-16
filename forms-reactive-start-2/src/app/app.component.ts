import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {fromArray} from 'rxjs-compat/observable/fromArray';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Ana', 'Jelena'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(value => { console.log(value); } );
    // this.signupForm.statusChanges.subscribe(status => { console.log(status); } );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  get username() {
    return (this.signupForm.get('userData.username') as FormControl);
  }

  get hobbies() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onHobbyAdd() {
    console.log(this.hobbies);
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  deleteHobby(i: number) {
    console.log((<FormArray>this.signupForm.get('hobbies')));
    (<FormArray>this.signupForm.get('hobbies')).controls.splice(i, 1);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSetUsername() {
    this.signupForm.patchValue({userData: {username: 'e jbg sta je sad ovo'}});

  }

  onSetForm() {
    this.signupForm.setValue({
      userData: {
        username: 'neki novi user',
        email: 'mosda@nesto.ovako'
      },
      gender: 'male',
      hobbies: [
        (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required)),
        (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required)),
        (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required)),
        (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required)),
      ]
    });

  }
  // ovako radi, ali akda stavim pravu vrednost 'hobbies' onda ne radi, nemam pojma kako ovo sa array-ovima funkcionise
  onSetHobby() {
    this.signupForm.patchValue({
      hobbyes: [(<FormArray>this.signupForm.get('hobbies')).push(new FormControl('ovo je hovi iz patcha', Validators.required)),]
    });
  }
}
