import {Component, OnDestroy, OnInit} from '@angular/core';

import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChange.subscribe(
      (ingredients: IngredientModel[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
