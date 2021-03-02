import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ContentChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @ViewChild('serverContent', {static: true}) serverContent: ElementRef

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({serverName: serverName.value, serverContent: this.serverContent.nativeElement.value})

  }

  onAddBlueprint(serverName: HTMLInputElement) {
    this.blueprintCreated.emit({serverName: serverName.value, serverContent: this.serverContent.nativeElement.value})
  }

}
