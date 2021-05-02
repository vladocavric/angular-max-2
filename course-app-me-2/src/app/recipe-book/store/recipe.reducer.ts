import {RecipeModel} from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: RecipeModel[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipesActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {...state, recipes: [...action.payload]};
    case RecipeActions.ADD_RECIPE:
      return {...state, recipes: [...state.recipes, action.payload]};
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
       ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {...state, recipes: updatedRecipes};
    case RecipeActions.DELETE_RECIPE:
      const recipes = [...state.recipes];
      recipes.slice(action.payload, 1);
      return {...state, recipes};
    default:
      return state;
  }
}
