import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  submitted = false;
  project = {
    name: '',
    mail: '',
    status: ''
  };


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.forbiddenNameAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  onSubmit() {
    // console.log('evo nesto u konzoli');
    console.log(this.projectForm);
    this.project.name = this.projectForm.value.projectName;
    this.project.mail = this.projectForm.value.email;
    this.project.status = this.projectForm.value.status;
    this.submitted = true;
    this.projectForm.reset();
  }

  forbiddenNames1(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({nameIsForbiddenAsync: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
