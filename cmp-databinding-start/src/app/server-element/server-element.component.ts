import {Component, OnInit, Input, ViewEncapsulation, ContentChild, ElementRef, AfterContentInit} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, AfterContentInit {
  @Input() element: {type: string, name: string, content: string}
  @ContentChild('paragraphContent', {static: true}) paragraphContent: ElementRef

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterContentInit () {
    console.log(this.paragraphContent.nativeElement.textContent)
  }

}
