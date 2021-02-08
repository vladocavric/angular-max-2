export class RecipeModel {
  public name: string;
  public description: string;
  public imgPath: string;

  constructor(name: string, des: string, img: string) {
    this.name = name;
    this.description = des;
    this.imgPath = img;
  }

}
