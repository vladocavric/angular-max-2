import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.sass']
})
export class ServersComponent implements OnInit {
  allowNewServer = false
  serverCreationStatus = false
  serverName = 'test server'
  servers = ['alfa', 'beta']
  constructor() {
    setTimeout(() => {
    this.allowNewServer = true
   }, 3000);
  }


  ngOnInit(): void {
  }

  onServerCreation() {
    this.serverCreationStatus = true
    this.servers.push(this.serverName)
  }

  // onServerNameInput(event: Event) {
  //   console.log(event)
  //   this.serverName = (<HTMLInputElement>event.target).value
  // }
}
