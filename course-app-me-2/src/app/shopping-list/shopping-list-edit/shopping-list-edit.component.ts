import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IngredientModel} from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
// import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('name', {static: false}) name: ElementRef;
  // @ViewChild('amount', {static: false}) amount: ElementRef;
  @ViewChild('form', {static: false}) form: NgForm;
  subscription: Subscription;
  startEdit = false;
  editedItemIndex: number;
  editedIngredient: IngredientModel;
  ingredientsListLength: number;


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.startEdit = true;
        this.editedIngredient = stateData.editedIngredient;
        this.form.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.quantity
        });
      } else {
        this.startEdit = false;
      }
    });
    // this.ingredientsListLength = this.slService.getIngredientsListLength();
    // console.log(this.ingredientsListLength);
    // this.subscription = this.slService.startEdit.subscribe(
    //   (i: number) => {
    //     this.startEdit = true;
    //     this.editedItemIndex = i;
    //     this.editedIngredient = this.slService.getIngridient(i);
    //   }
    // );
  }


  onAddIngredient(form: NgForm) {
    const item = form.value;
    const newIngredient = new IngredientModel(item.name, item.amount);
    if (this.startEdit) {
      // this.slService.editIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.slService.addIngridient(newIngredient);
      this.ingredientsListLength++;
      console.log(this.ingredientsListLength);
    }
    this.startEdit = false;
    this.form.reset();
  }

  ngOnDestroy() {
    // this.startEdit = false;
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onCancel() {
    console.log(this.form);
    this.form.reset();
    this.startEdit = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngridient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.form.reset();
    this.startEdit = false;
  }
}
