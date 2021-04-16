import {Injectable} from '@angular/core';
import {RecipeModel} from '../recipe-book/recipe.model';
import {IngredientModel} from './ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipe = new Subject<RecipeModel>();
  recipesChange = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];
  constructor(private store: Store<{shoppingList: {ingredients: IngredientModel[]}}>) {
  }
  // private recipes: RecipeModel[] = [
  //   new RecipeModel(
  //     1,
  //     'Sarma',
  //     'kiseli kupus, riza, meso',
  //     'https://www.tablicakalorija.com/wp-content/uploads/2017/02/sarma-730x430.jpg',
  //     [
  //       new IngredientModel('kiseli kupus', 55),
  //       new IngredientModel('pirinac', 300),
  //       new IngredientModel('meso', 500)
  //     ]),
  //   new RecipeModel(
  //     2,
  //     'Svadbarski kupus',
  //     'kupus, meso ...',
  //     'https://www.recepti.com/img/recipe/38016-svadbarski-kupus.jpg',
  //     [
  //       new IngredientModel('kupus', 30),
  //       new IngredientModel('meso', 300)
  //     ])
  // ];
  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipesChange.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const result = this.recipes.filter(rec => rec.id === id);
    // console.log(result);
    return result[0];
  }

  getRecipesLenght() {
    return this.recipes.length + 1;
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: RecipeModel) {
    this.recipes[index] = recipe;
    this.recipesChange.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    console.log(index)
    this.recipes.splice(index, 1);
    console.log(this.recipes);
    this.recipesChange.next(this.recipes.slice());
  }
  deleteAllRecipes() {
    this.recipes = [];
    this.recipesChange.next(this.recipes.slice());
  }
}
