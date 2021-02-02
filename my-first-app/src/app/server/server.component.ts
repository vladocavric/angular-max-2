import {Component} from '@angular/core'

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
        color: white;
    }
  `]
})

export class ServerComponent{
  serverId = 5;
  servesStatus = 'offline'
  constructor() {
    this.servesStatus = Math.random() < 0.5 ? 'online' : 'offline'
  }
  getServerStats() {
    return this.servesStatus
  }
  getColor() {
    return this.servesStatus === 'online' ? 'green' : 'red'
  }

}
