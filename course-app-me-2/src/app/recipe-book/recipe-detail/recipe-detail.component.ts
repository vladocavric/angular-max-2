import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {RecipeModel} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: RecipeModel;
  recipe: RecipeModel;
  show = false;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(map(params => {
      return +params.id;
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => {
      this.recipe = recipe;
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
