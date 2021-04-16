import {IngredientModel} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import {sample} from 'rxjs/operators';

export interface State {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]};
    case ShoppingListActions.ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]};
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {...ingredient, ...action.payload};
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {...state, ingredients: updatedIngredients};
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: null,
        editedIngredient: -1
      };
    default:
      return state;
  }
}
