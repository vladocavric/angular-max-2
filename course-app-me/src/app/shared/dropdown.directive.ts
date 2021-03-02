import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() set appDropdown(condition: boolean) {
    condition ? this.vcRef.createEmbeddedView(this.templateRef) : this.vcRef.clear();
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
