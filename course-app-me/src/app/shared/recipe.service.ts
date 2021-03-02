import {Injectable, EventEmitter} from '@angular/core';
import {RecipeModel} from '../recipe-book/recipe.model';
import {IngredientModel} from './ingredient.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipe = new EventEmitter<RecipeModel>();
  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Sarma',
      'kiseli kupus, riza, meso',
      'https://www.tablicakalorija.com/wp-content/uploads/2017/02/sarma-730x430.jpg',
      [
        new IngredientModel('kiseli kupus', 55),
        new IngredientModel('pirinac', 300),
        new IngredientModel('meso', 500)
      ]),
    new RecipeModel(
      'Svadbarski kupus',
      'kupus, meso ...',
      'https://www.recepti.com/img/recipe/38016-svadbarski-kupus.jpg',
      [
        new IngredientModel('kupus', 30),
        new IngredientModel('meso', 300)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
