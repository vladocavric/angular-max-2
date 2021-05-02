import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipeService} from '../../shared/recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private saveStorage: DataStorageService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes;
      });
    // this.saveStorage.fetchData().subscribe();
    // this.recipeService.recipes.subscribe
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteAll() {
    this.recipeService.deleteAllRecipes();
  }
}
