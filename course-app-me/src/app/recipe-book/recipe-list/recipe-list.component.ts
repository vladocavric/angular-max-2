import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { RecipeModel } from '../recipe.model';
import {RecipeService} from '../../shared/recipe.service'


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  // @Output() recipe = new EventEmitter<RecipeModel>();
  recipes: RecipeModel[] = [];
  // recipes: RecipeModel[] = [
  //   new RecipeModel('Sarma', 'kiseli kupus, riza, meso', 'https://www.tablicakalorija.com/wp-content/uploads/2017/02/sarma-730x430.jpg'),
  //   new RecipeModel('Svadbarski kupus', 'kupus, meso ...', 'https://www.recepti.com/img/recipe/38016-svadbarski-kupus.jpg')
  // ];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // itemWasSelected(recipe: RecipeModel) {
  //   this.recipe.emit(recipe);
  // }

}
