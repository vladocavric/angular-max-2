import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
  hobbies = ['skijanje', 'fudbal', 'kosarka'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
    // this.signupForm.statusChanges.subscribe(status => {
    //   console.log(status);
    // });

    this.signupForm.setValue({
      'userData': {
        'username': 'neko',
        'email': 'neko@niko'
      },
      gender: 'female',
      'hobbies': []
        // [
      //   (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('aaa', [Validators.required])),
      //   (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('neko', [Validators.required])),
      //   (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('niko', [Validators.required]))
      // ]
    });

    // this.signupForm.patchValue({
    //   'userData': {
    //     'username': 'neko',
    //     'email': 'neko@niko'
    //   },
    //   gender: 'female',
    //   'hobbies': [
    //     (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('aaa', [Validators.required])),
    //     (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('neko', [Validators.required])),
    //     (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('niko', [Validators.required]))
    //   ]
    // });

    // this.signupForm.patchValue({
    //   hobbies: [
    //   // (<FormArray>this.signupForm.get('hobbies')).controls,
    //   (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('nesto'))
    //   ]
    // });

    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Jelena'
    //   },
      // hobbies: [
      // // (<FormArray>this.signupForm.get('hobbies')).controls,
      // (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('nesto'))
      // ]
    // });
  }

  onSubmit() {
    console.log(this.signupForm);
    // this.signupForm['userData.username'].reset();
    this.signupForm.reset();
    // this.signupForm.get('hobbies.0').reset();
  }

  onHobbyAdd() {
    const control = new FormControl(null, [Validators.required]);
    // (<FormArray>this.signupForm.get('hobbies')).push(control);
    this.hobbiesArr.push(control);
  }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }
  get hobbiesArr() {
    return (this.signupForm.get('hobbies') as FormArray)
  }
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
