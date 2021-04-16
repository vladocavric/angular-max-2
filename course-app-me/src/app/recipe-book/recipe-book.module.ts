import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeBookComponent} from './recipe-book.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipeBookRoutingModule} from './recipe-book-routing.module';
import {NoRecipeSelectedComponent} from './no-recipe-selected/no-recipe-selected.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    NoRecipeSelectedComponent,
  ],
  // exports: [
  //   RecipeBookComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeDetailComponent,
  //   RecipeEditComponent,
  // ],
  imports: [
    SharedModule, RecipeBookRoutingModule,  ReactiveFormsModule, ClickOutsideModule

  ]
})
export class RecipeBookModule { }
