import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  changedRecipes = new Subject<Recipe[]>();
  private recipes: Recipe[] = []
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'punjena paprika',
  //     'paprika, sok od paradaiza, meso, riza',
  //     'https://www.recepti.com/img/recipe/25249-punjena-paprika.jpg',
  //     [
  //       new IngredientModel('sok od paradaiza', 1),
  //       new IngredientModel('paprika', 25),
  //       new IngredientModel('meso', 300),
  //       new IngredientModel('pirinac', 500)
  //     ]),
  //   new Recipe(
  //     'sarma',
  //     'kiseli kupus, sok od paradaiza, meso, riza',
  //     'https://www.tablicakalorija.com/wp-content/uploads/2017/02/sarma-730x430.jpg',
  //     [
  //       new IngredientModel('kiseli kupus', 55),
  //       new IngredientModel('pirinac', 300),
  //       new IngredientModel('meso', 500)
  //     ])
  // ];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.changedRecipes.next(this.recipes);
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngridients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.changedRecipes.next(this.recipes);
  }
  changeRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.changedRecipes.next(this.recipes);
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.changedRecipes.next(this.recipes);
  }
}
