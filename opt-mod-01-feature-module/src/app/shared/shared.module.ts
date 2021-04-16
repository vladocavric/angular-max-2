import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownDirective} from "./dropdown.directive";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";



@NgModule({
  declarations: [DropdownDirective, PlaceholderDirective, AlertComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [DropdownDirective, PlaceholderDirective, AlertComponent, LoadingSpinnerComponent, CommonModule],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule { }
