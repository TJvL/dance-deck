import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NewCategoryDto } from '../category.dto';
import { CategoriesStore } from '../category.store';

import { CategoryTreeNodeComponent } from './category-tree-node/category-tree-node.component';

@Component({
  selector: 'app-category-tree',
  imports: [CategoryTreeNodeComponent],
  templateUrl: './category-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeComponent {
  readonly categoryStore = inject(CategoriesStore);

  async addCategory(newCategoryDto: NewCategoryDto) {
    await this.categoryStore.create(newCategoryDto);
  }

  async removeCategory(id: number) {
    await this.categoryStore.delete(id);
  }
}
