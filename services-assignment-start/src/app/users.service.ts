import {Injectable} from '@angular/core';
import {CounterService} from './counter.service';


@Injectable({providedIn: 'root'})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  // inactiveToActive = 0;
  // activeToInactive = 0;

  constructor(private counterService: CounterService) {
  }

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.countInactiveToActive();
    // this.counterService.counter(inactiveToActive, 'set to active');
    // console.log(inactiveToActive);
  }

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.countActiveToInactive();
    // this.counterService.counter(this.activeToInactive, 'set to inactive');
  }
}
