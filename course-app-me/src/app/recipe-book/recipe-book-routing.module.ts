import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RecipeBookComponent} from './recipe-book.component';
import {AuthGuard} from '../auth/auth.guard';
import {NoRecipeSelectedComponent} from './no-recipe-selected/no-recipe-selected.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeResolverService} from '../shared/recipe-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipeBookRoute: Routes = [
  {
    path: '', component: RecipeBookComponent, canActivate: [AuthGuard], children: [
      {path: '', component: NoRecipeSelectedComponent},
      {path: 'new', component: RecipeEditComponent, resolve: [RecipeResolverService]},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipeBookRoute)
  ],
  exports: [RouterModule]
})
export class RecipeBookRoutingModule {
}
