import {IngredientModel} from '../shared/ingredient.model';

export class RecipeModel {
  public id: number;
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: IngredientModel[];

  constructor(id: number, name: string, des: string, img: string, ingredients: IngredientModel[]) {
    this.id = id;
    this.name = name;
    this.description = des;
    this.imgPath = img;
    this.ingredients = ingredients;
  }

}
