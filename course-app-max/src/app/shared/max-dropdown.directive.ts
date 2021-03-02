import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxDropdown]'
})
export class MaxDropdownDirective {
  @HostBinding('class.btn-primary') blue = false;
  @HostBinding('class.btn-secondary') gray = true;

  @HostListener('click') toggleBlue() {
    this.blue = !this.blue;
    this.gray = !this.gray;
  }
  constructor() { }

}
