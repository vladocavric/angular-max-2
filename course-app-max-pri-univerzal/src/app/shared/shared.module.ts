import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './dropdown.directive';
import {MaxDropdownDirective} from './max-dropdown.directive';
import {LoadingSpinerComponent} from './loading-spiner/loading-spiner.component';
import {AlertComponent} from './alert/alert.component';


@NgModule({
    declarations: [
        DropdownDirective,
        MaxDropdownDirective,
        LoadingSpinerComponent,
        AlertComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        MaxDropdownDirective,
        LoadingSpinerComponent,
        AlertComponent
    ]
})
export class SharedModule {
}
