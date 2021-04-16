import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {IngredientModel} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

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


  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredientsListLength = this.slService.getIngredientsListLength();
    console.log(this.ingredientsListLength);
    this.subscription = this.slService.startEdit.subscribe(
      (i: number) => {
        this.startEdit = true;
        this.editedItemIndex = i;
        this.editedIngredient = this.slService.getIngridient(i);
        this.form.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.quantity
        });
      }
    );
  }


  onAddIngredient(form: NgForm) {
    const item = form.value;
    const newIngredient = new IngredientModel(item.name, item.amount);
    if (this.startEdit) {
      this.slService.editIngredient(this.editedItemIndex, newIngredient);
    } else {
    this.slService.addIngridient(newIngredient);
    this.ingredientsListLength++;
    console.log(this.ingredientsListLength);
    }
    this.startEdit = false;
    this.form.reset();
  }

  ngOnDestroy() {
    // this.startEdit = false;
    this.subscription.unsubscribe();
  }

  onCancel() {
    console.log(this.form);
    this.form.reset();
    this.startEdit = false;
  }

  onDelete() {
    this.slService.deleteIngridient(this.editedItemIndex);
    this.form.reset()
    this.startEdit = false;
  }
}
