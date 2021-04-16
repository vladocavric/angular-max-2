import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.changedRecipes.subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
