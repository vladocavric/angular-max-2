import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router, Data} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data.server;
      });
    // this.server = this.serversService.getServer(1);
    // this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    // this.route.params.subscribe((params: Params) => this.server = this.serversService.getServer(+params.id));
  }

  // toReloadServer(id: number) {
  //   this.router.navigate(['/servers', id, 'edit']);
  //     // this.router.navigate(['server'], {relativeTo: this.route});
  // }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}


