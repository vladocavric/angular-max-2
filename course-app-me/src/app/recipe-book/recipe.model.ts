import {IngredientModel} from '../shared/ingredient.model';

export class RecipeModel {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: IngredientModel[];

  constructor(name: string, des: string, img: string, ingredients: IngredientModel[]) {
    this.name = name;
    this.description = des;
    this.imgPath = img;
    this.ingredients = ingredients;
  }

}
