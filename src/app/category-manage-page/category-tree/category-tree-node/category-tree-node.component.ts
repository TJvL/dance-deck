import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryNodeDto, NewCategoryDto } from '../../category.dto';

@Component({
  selector: 'app-category-tree-node',
  imports: [FormsModule],
  templateUrl: './category-tree-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeNodeComponent {
  readonly category = input<CategoryNodeDto>({
    id: 0,
    parentId: 0,
    name: '',
    childCategories: [],
  });

  readonly onAdd = output<NewCategoryDto>();
  readonly onRemove = output<number>();

  newSubcategoryName = '';

  addSubcategory() {
    this.onAdd.emit({ name: this.newSubcategoryName, parentId: this.category().id });
    this.newSubcategoryName = '';
  }

  removeSubcategory() {
    this.onRemove.emit(this.category().id);
  }
}
