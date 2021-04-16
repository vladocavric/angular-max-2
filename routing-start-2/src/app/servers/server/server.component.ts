import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router, Data} from '@angular/router';
import {relative} from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.server = this.serversService.getServer(+params.id);
    // });
    this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });
    // console.log(this.route);
  }
}
