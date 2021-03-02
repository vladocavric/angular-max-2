import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = isNaN(parseFloat(this.amountInputRef.nativeElement.value)) ? 0 : parseFloat(this.amountInputRef.nativeElement.value);
    const newIngredient = new IngredientModel(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }
}
