import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeModel } from '../recipe.model';
import {RecipeService} from '../../shared/recipe.service'
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  private  subscription: Subscription;
  constructor(private recipeService: RecipeService, private saveStorage: DataStorageService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChange.subscribe((recipes: RecipeModel[]) => {this.recipes = recipes});
    this.saveStorage.fetchData().subscribe();
    // this.recipeService.recipes.subscribe
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteAll() {
    this.recipeService.deleteAllRecipes()
  }
}
