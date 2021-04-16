import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() error;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onClose() {
    this.close.emit();
  }
}
