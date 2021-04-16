import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthComponent} from './auth/auth.component';

const appRoute: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', loadChildren: () => import('./recipe-book/recipe-book.module').then(module => module.RecipeBookModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoute, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule{}
