import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {RecipeModel} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: RecipeModel;
  recipe: RecipeModel;
  show = false;

  constructor(private recipeService: RecipeService,
              private  router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.recipeService.recipe.subscribe(
    //   (recipe: RecipeModel) => {
    //     console.log(recipe);
    //     this.recipe = recipe;
    //   }
    // );
    // this.recipeService.recipe.subscribe(
    //   (recipe: RecipeModel) => {
    //     this.recipe = recipe;
    //   }
    // );
    this.route.params.subscribe((params) => {
      // console.log(this.recipeService.getRecipe(+params.id))
      this.recipe = this.recipeService.getRecipe(+params.id);
    });
  }

  addTosl() {
   // this.slService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

  onDelete(id: number) {
    const index = id - 1;
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClickedOutside() {
    this.show = false;
  }
}
