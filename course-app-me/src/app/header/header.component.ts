import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() select = new EventEmitter<string>();
  selectNav = 'recipe';
  show = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(arg: string) {
    this.selectNav = arg;
    this.select.emit(arg);
  }

}
