import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'punjena paprika',
      'paprika, sok od paradaiza, meso, riza',
      'https://www.recepti.com/img/recipe/25249-punjena-paprika.jpg',
      [
        new IngredientModel('sok od paradaiza', 1),
        new IngredientModel('paprika', 25),
        new IngredientModel('meso', 300),
        new IngredientModel('pirinac', 500)
      ]),
    new Recipe(
      'sarma',
      'kiseli kupus, sok od paradaiza, meso, riza',
      'https://www.tablicakalorija.com/wp-content/uploads/2017/02/sarma-730x430.jpg',
      [
        new IngredientModel('kiseli kupus', 55),
        new IngredientModel('pirinac', 300),
        new IngredientModel('meso', 500)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngridients(ingredients);
  }
}
