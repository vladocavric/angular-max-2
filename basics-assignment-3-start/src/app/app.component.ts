import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = true
  bananas = []
  num = 0

  onClick() {
    this.show = !this.show;
    this.num++
    this.bananas.push({
      name: `banana ${this.num}`,
      time: Date.now()
    })
    console.log(this.bananas)
  }
}
