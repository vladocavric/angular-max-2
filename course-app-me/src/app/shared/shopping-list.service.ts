import {Injectable} from '@angular/core';
import {IngredientModel} from './ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredients: IngredientModel[] = [
    new IngredientModel('banana', 10),
    new IngredientModel('orange', 10)
  ];

  addIngridient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
  }

  addIngredientsFromRecipe(ingridients: IngredientModel[]) {
    // console.log(ingridients);
    this.ingredients = this.ingredients.concat(ingridients);
    // console.log(this.ingredients);
    // console.log(noviArr)
    // this.ingredients = [...this.ingredients, ...ingridients];
  }
}
