import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CounterService {
  // counter(count, what) {
  //   count++;
  //   console.log(`${what} ${count} clicks`);
  //   return count;
  // }

  inactiveToActive = 0;
  activeToInactive = 0;

  countInactiveToActive() {
    this.inactiveToActive++;
    console.log(this.inactiveToActive);
  }

  countActiveToInactive() {
    this.activeToInactive++;
    console.log(this.activeToInactive);
  }
}
