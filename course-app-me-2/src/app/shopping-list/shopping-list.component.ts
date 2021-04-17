import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {IngredientModel} from '../shared/ingredient.model';
// import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IngredientModel[] }>;
  // ingredients: IngredientModel[] = [
  //   new IngredientModel('banana', 10),
  //   new IngredientModel('orange', 10)
  // ];

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.ingredients;
  }


  onStartEdit(i: number) {
    // this.slService.startEdit.next(i);
    this.store.dispatch(new ShoppingListActions.StartEdit(i));
  }
}
