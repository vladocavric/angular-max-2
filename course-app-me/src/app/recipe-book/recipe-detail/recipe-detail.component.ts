import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {RecipeModel} from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: RecipeModel;
  recipe: RecipeModel;
  show = false;

  constructor(private recipeService: RecipeService, private slService: ShoppingListService) { }

  ngOnInit(): void {
    // this.recipeService.recipe.subscribe(
    //   (recipe: RecipeModel) => {
    //     console.log(recipe);
    //     this.recipe = recipe;
    //   }
    // );
    this.recipeService.recipe.subscribe(
      (recipe: RecipeModel) => {
        this.recipe = recipe;
      }
    );
  }

  addTosl() {
   this.slService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

}
