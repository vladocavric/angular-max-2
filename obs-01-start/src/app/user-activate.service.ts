import {EventEmitter, Injectable} from '@angular/core';
import { Subject} from "rxjs";


@Injectable({providedIn: 'root'})

export class UserActivateService {
  activateEmitter = new Subject<boolean>();
}
