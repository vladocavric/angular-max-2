import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../shared/shopping-list.service';
import {IngredientModel} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: IngredientModel[] = [];
  // ingredients: IngredientModel[] = [
  //   new IngredientModel('banana', 10),
  //   new IngredientModel('orange', 10)
  // ];

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.slService.ingredients;
  }


}
