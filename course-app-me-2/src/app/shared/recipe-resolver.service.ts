import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';

import {RecipeModel} from '../recipe-book/recipe.model';
import {RecipeService} from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipe-book/store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<RecipeModel[]> {
  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions,
              private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0 ) {
    // return this.dataStorage.fetchData();
    // }
    // return recipes;
    return this.store.select('recipes').pipe(take(1), map(recipeState => {
      return recipeState.recipes;
    }), switchMap(recipes => {
      if (recipes.length === 0) {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
      } else {
        return of(recipes);

      }
    }));

  }
}
