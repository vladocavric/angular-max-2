import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {IngredientModel} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('amount', {static: false}) amount: ElementRef;


constructor(private slService: ShoppingListService) {
}

ngOnInit(): void {};
// onAddIngredient(name: HTMLInputElement, amount: HTMLInputElement) {
//   this.ingredient.emit({name: name.value, quantity: parseFloat(amount.value)});
// }
onAddIngredient() {
  const newIngredient = new IngredientModel(this.name.nativeElement.value, parseFloat(this.amount.nativeElement.value));
  this.slService.addIngridient(newIngredient);
  }
}
