import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import {RecipesComponent} from './recipes.component';
import {RecipeResolverService} from './recipe-resolver.service';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipeRoute: Routes = [
    {path: '', component: RecipesComponent, canActivate: [AuthGuard], resolve: [RecipeResolverService], children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
        ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoute)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {
}
