import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  incrementArr = [];
  onNumberAdded(number: number) {
    this.incrementArr.push(number);
  }
}
