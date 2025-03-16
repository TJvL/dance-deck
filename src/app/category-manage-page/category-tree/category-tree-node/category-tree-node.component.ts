import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryDto, NewCategoryDto } from '../../category.dto';

@Component({
  selector: 'app-category-tree-node',
  imports: [FormsModule],
  templateUrl: './category-tree-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeNodeComponent {
  @Input() category!: CategoryDto;

  @Output() onAdd = new EventEmitter<NewCategoryDto>();
  @Output() onRemove = new EventEmitter<number>();

  newSubcategoryName = '';

  addSubcategory() {
    this.onAdd.emit({ name: this.newSubcategoryName, parentId: this.category.id });
    this.newSubcategoryName = '';
  }

  removeSubcategory() {
    this.onRemove.emit(this.category.id);
  }
}
