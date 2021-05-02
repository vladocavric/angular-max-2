import {Component} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        background: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        background: 'green',
        transform: 'translateX(200px)'
      })),
      transition('normal <=> highlighted', animate(500)),
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildAnimation', [
      state('normal', style({
        background: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        background: 'green',
        transform: 'translateX(200px) scale(1)'
      })),
      state('shrunk', style({
        background: 'blue',
        transform: 'scale(0.5) translateX(0)'
      })),
      transition('normal <=> highlighted', animate(500)),
      transition('shrunk <=> *', [
        style({
          background: 'orange'
        }),
        animate(1000, style({
          borderRadius: '15px'
        })),
        animate(500)
      ]),
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger('listItem', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }), animate(500)]),
      transition('* => void', [animate(500, style({
        transform: 'translateX(-100px)',
        opacity: 0,
      }))]),
    ]),
    trigger('listItem2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [animate(1000, keyframes([
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          offset: 0
        }),
        style({
          opacity: 0.5,
          transform: 'translateX(-70px)',
          offset: 0.3
        }),
        style({
          opacity: 0.7,
          transform: 'translateX(-30px)',
          offset: 0.7
        }),
        style({
          opacity: 1,
          transform: 'translateX(0)',
          offset: 1
        }),
      ]))]),
      transition('* => void', [group([
        animate(300, style({
          color: 'red'
        })),
        animate(800, style({
          transform: 'translateX(-100px)',
          opacity: 0,
        })),
      ])]),
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunk';
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event) {
    console.log(event)
  }

  animationEnd(event) {
    console.log(event)
  }
}
