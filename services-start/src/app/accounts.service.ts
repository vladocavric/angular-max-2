import {Injectable, EventEmitter} from '@angular/core';
import {LoggingService} from './logging.service';
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdate = new EventEmitter<string>();
  constructor(private loggingService: LoggingService) {
  }
  addAccount(name: string, status: string) {
    this.accounts.push({name, status});
    this.loggingService.loggingStatus(status);
  }

  statusChange(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.loggingStatus(status);
  }
}
