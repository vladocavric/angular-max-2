import {Directive, ElementRef, HostListener, OnInit, Renderer2, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor = 'SkyBlue';
  @Input('appBetterHighlight') highlightColor = 'Tan';
  @HostBinding('style.backgroundColor') backgroundColor = 'Chartreuse';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'orange');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'purple');
    // this.backgroundColor = 'Coral';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'aqua');
    this.backgroundColor = 'DarkGreen';
  }
}
