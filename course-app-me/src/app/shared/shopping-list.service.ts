import {Injectable} from '@angular/core';
import {IngredientModel} from './ingredient.model';
import {Subject, Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  startEdit = new Subject<number>();
  ingredients: IngredientModel[] = [
    new IngredientModel('banana', 10),
    new IngredientModel('orange', 5)
  ];

  addIngridient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
  }

  editIngredient(index: number, ingredient: IngredientModel) {
    const currentIndex = this.getIngredientsListLength() - index - 1;
    this.ingredients[currentIndex] = ingredient;
  }

  addIngredientsFromRecipe(ingridients: IngredientModel[]) {
    // console.log(ingridients);
    this.ingredients = this.ingredients.concat(ingridients);
    // console.log(this.ingredients);
    // console.log(noviArr)
    // this.ingredients = [...this.ingredients, ...ingridients];
  }

  getIngridient(index: number) {
    const currentIndex = this.getIngredientsListLength() - index - 1;
    return this.ingredients[currentIndex];
  }
  deleteIngridient(index: number) {
    const currentIndex = this.getIngredientsListLength() - index - 1;
    return this.ingredients.splice(currentIndex, 1);
  }
  getIngredientsListLength() {
    return this.ingredients.length;
  }
}
