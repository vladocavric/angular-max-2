import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ShoppingListComponent }])
  ]
})
export class ShoppingListModule { }
