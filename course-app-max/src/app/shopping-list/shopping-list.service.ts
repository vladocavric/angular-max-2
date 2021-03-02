import {EventEmitter} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';


export class ShoppingListService {
  ingredientsChange = new EventEmitter<IngredientModel[]>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('apple', 10),
    new IngredientModel('orange', 5)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
  addIngridients(ingrideents: IngredientModel[]) {
    this.ingredients.push(...ingrideents);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
