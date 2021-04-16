import {IngredientModel} from '../shared/ingredient.model';
import {Subject} from 'rxjs';


export class ShoppingListService {
  ingredientsChange = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('apple', 10),
    new IngredientModel('orange', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngridient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngridients(ingrideents: IngredientModel[]) {
    this.ingredients.push(...ingrideents);
    this.ingredientsChange.next(this.ingredients.slice());
  }
  deleteIngridient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
