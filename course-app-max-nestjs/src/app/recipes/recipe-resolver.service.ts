import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';
import {AuthService} from '../auth/auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!!user) {
        return this.dataStorageService.fetchRecipes();
      }
      return [];
    }));
    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    // }
    // return recipes;
  }
}
