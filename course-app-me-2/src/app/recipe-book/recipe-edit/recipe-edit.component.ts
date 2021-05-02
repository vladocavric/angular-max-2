import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../shared/recipe.service';
import {RecipeModel} from '../recipe.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  removedIngredient = false;
  private storeSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.id = +params.id - 1;
      this.editMode = params.id !== undefined;
      this.initForm();
    });
  }

  private initForm() {
    let recipeId = this.recipeService.getRecipesLenght();
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);


    if (this.editMode) {

      this.storeSub = this.store.select('recipes')
        .pipe(map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })).subscribe(recipe => {
          recipeId = this.id;
          recipeName = recipe.name;
          recipeImage = recipe.imgPath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                quantity: new FormControl(ingredient.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          }
        });

    }
    this.recipeForm = new FormGroup({
      id: new FormControl(recipeId, Validators.required),
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    let id = this.editMode ? +this.id : +this.recipeService.getRecipesLenght();
    console.log(this.recipeForm);
    let index = id - 1;
    console.log(id, index);
    const recipe = new RecipeModel(
      id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(index, recipe);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: id, newRecipe: recipe}));
      this.router.navigate(['../../', id], {relativeTo: this.route});
    } else {
      // this.recipeService.addRecipe(recipe);
      this.store.dispatch(new RecipeActions.AddRecipe(recipe));
      this.router.navigate(['../', id], {relativeTo: this.route});
    }
  }

  // onSubmit() {
  //   console.log(this.recipeForm.value);
  // }

  get ingredients() {
    // return (this.recipeForm.get('ingredients') as FormArray).controls;
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onAddNewIngredient() {
    // this.ingredients.push(new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    // }));
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(),
      quantity: new FormControl()
    }));
  }

  onIngredientDelete(i: number) {
    // this.ingredients.splice(i, 1);
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
    this.removedIngredient = true;
    // console.log(this.removedIngredient);
  }

  onCancel() {
    // this.initForm();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDelete() {
    const index = this.id - 1;
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onDeleteAllIngredients() {

  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
