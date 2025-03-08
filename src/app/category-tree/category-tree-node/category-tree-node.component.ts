import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryDto } from '../category.dto';

@Component({
  selector: 'app-category-tree-node',
  imports: [FormsModule],
  templateUrl: './category-tree-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeNodeComponent {
  @Input() category!: CategoryDto;

  @Output() onAdd = new EventEmitter<{ parent: CategoryDto; newName: string }>();
  @Output() onRemove = new EventEmitter<CategoryDto>();
  @Output() onEdit = new EventEmitter<CategoryDto>();

  newSubcategoryName = '';

  addSubcategory() {
    this.onAdd.emit({ parent: this.category, newName: this.newSubcategoryName });
    this.newSubcategoryName = '';
  }

  removeCategory() {
    this.onRemove.emit(this.category);
  }

  editCategory() {
    this.onEdit.emit(this.category);
  }
}
