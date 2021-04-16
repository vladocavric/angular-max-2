import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs'
import {map, filter} from 'rxjs/operators'

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

    const custoomIntervalObservable = Observable.create(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        count++
        // if (count === 5) {
        if (count === 2) {
          observer.complete()
        }
        if (count >= 3) {
          observer.error(new Error('the count is 3 or more'))
        }
      }, 1000)
    })



    this.firstInterval = custoomIntervalObservable.pipe(filter(data => {
      return data > 0
    }),map(data => {
      return `Round ${data}`
    })).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
      alert(error)
    }, () => {
      console.log('Completed!')
    })
  }
  ngOnDestroy() {
    this.firstInterval.unsubscribe()

  }

}
