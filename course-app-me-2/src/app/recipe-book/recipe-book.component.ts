import { Component, OnInit } from '@angular/core';
import {RecipeModel} from './recipe.model';
import {RecipeService} from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss']
})
export class RecipeBookComponent implements OnInit {
  recipeSelected: RecipeModel;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.recipeService.recipe.subscribe(
    //   (recipe: RecipeModel) => {
    //     this.recipeSelected = recipe;
    //   }
    // );
  }

}
