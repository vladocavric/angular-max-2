import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() incrementIncrease = new EventEmitter<number>();
  interval;
  increment = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.interval = setInterval(() => {
      // this.increment++;
      this.incrementIncrease.emit(this.increment++);
      // console.log(this.increment);
    }, 1000);
  }

  onStop() {
    clearInterval(this.interval);
    console.log('stop is clicked');
  }

}
