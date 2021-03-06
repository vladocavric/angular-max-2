import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from './recipe.service';
import {RecipeModel} from '../recipe-book/recipe.model';
import { map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipe-book/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-app-me-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(data => {
      console.log(data);
    });
  }

  fetchData() {
    return this.http.get<RecipeModel[]>('https://course-app-me-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(recipes => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
      }));
  }
}

