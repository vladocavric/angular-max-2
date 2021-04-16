import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstInterval: Subscription
  constructor() { }

  ngOnInit() {
    // this.firstInterval = interval(1000).subscribe(count => {
    //   console.log(count)
    // })
    // const customObservable = Observable.create(observer => {
    //   const count = 0
    //   setInterval(() => {
    //     observer.next(count)
    //     count++;
    //   }, 1000)
    // })
    const customObservable = new Observable(subscriber => {
      let count = 0
      setInterval(() => {
        subscriber.next(count)
        if (count === 5) {
          subscriber.complete()
        }
        if (count > 7) {
          subscriber.error(new Error('the count can not be larger then 3'))
        }
        count++
      }, 1000)
    })
    this.firstInterval = customObservable.pipe(filter(data => {
      return data > 1
    }),map((data: number) => {
      return `Return ${data + 5}`
    })).subscribe(data => {
      console.log(data)
    }, error => {
      alert(error.message)
    }, () => {
      console.log('the observable is completed')
    })
  }
  ngOnDestroy() {
    this.firstInterval.unsubscribe()
  }
}
