import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipeModel} from '../recipe-book/recipe.model';
import {DataStorageService} from './data-storage.service';
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<RecipeModel[]> {
  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0 ) {
    return this.dataStorage.fetchData();
    }
    return recipes;
  }
}
