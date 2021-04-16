import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  project = {
    name: '',
    mail: '',
    status: ''
  };
  submitted = false;

  ngOnInit() {
    this.projectForm = new FormGroup({
        projectName: new FormControl(null, [Validators.required], this.nameValidatorAsync),
        mail: new FormControl(null, [Validators.required, Validators.email]),
        projectStatus: new FormControl(null)
      }
    );
  }

  onSubmit() {
    console.log(this.projectForm);
    this.project.name = this.projectForm.value.projectName;
    this.project.mail = this.projectForm.value.mail;
    this.project.status = this.projectForm.value.projectStatus;
    this.submitted = true;
  }
  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'test') {
      return {falseName: true};
    }
    return null;
  }
  nameValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
      if (control.value === 'Test') {
        resolve({falseNameAsync: true});
      } else {
        resolve(null);
      }
      }, 1500);
    });
    return promise;
  }
}

