import {Component} from '@angular/core';
import {trigger, state, style, animate, transition, keyframes, group} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'green',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ]),
    trigger('wildDiv', [
      state('normal', style({
        backgroundColor: 'red',
        borderRadius: 0,
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'green',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrink', style({
        backgroundColor: 'blue',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrink <=> *', [
        style({
          backgroundColor: 'orange',
        }),
        animate(3000, style({
          borderRadius: '50%',
        })),
        animate(5000)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', animate(300, style({
        opacity: 0,
        transform: 'translateX(100px)'
      }))),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-100px)',
              offset: 0
            }),
            style({
              opacity: 0.3,
              transform: 'translateX(-80px)',
              offset: 0.5
            }),
            style({
              opacity: 0.5,
              transform: 'translateX(-40px)',
              offset: 0.9
            }),
            style({
              opacity: 1,
              transform: 'translateX(0)',
              offset: 1
            }),
          ]
        ))
      ]),
      transition('* => void', [
        group([
            animate(300, style({
              color: 'red'
            })),
            animate(300, style({
              opacity: 0,
              transform: 'translateX(100px)'
            })),
          ]
        )
      ]),
    ])
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
    this.wildState = 'shrink';
  }

  onDelete(item: string, i: number) {
    this.list.splice(i, 1);
  }


  onEnter(event, item) {
    if (event.code === 'Enter') {
      this.onAdd(item);
    }
  }

  animationStart($event: any) {
    console.log($event);
  }

  animationEnd($event: any) {
    console.log($event);
  }
}
