import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RecipeService} from '../../../shared/recipe.service';
import {RecipeModel} from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  // @Output() selectedItem = new EventEmitter<void>();
  @Input() element: RecipeModel;
  @Input() id: number;
  // @Input() element: {name: string, description: string, imgPath: string};
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelect() {
    this.recipeService.recipe.emit(this.element);
    console.log('from recipe item: ', this.element);
    // this.selectedItem.emit();
  }

}
