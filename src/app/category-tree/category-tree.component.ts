import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CategoryTreeNodeComponent } from './category-tree-node/category-tree-node.component';
import { NewCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category-tree',
  imports: [CategoryTreeNodeComponent],
  providers: [CategoryService],
  templateUrl: './category-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeComponent {
  private readonly categoryService = inject(CategoryService);

  constructor() {
    this.categoryService.getAllCategories();
  }

  get rootCategory() {
    return this.categoryService.rootCategory;
  }

  async addSubcategory(newCategoryDto: NewCategoryDto) {
    await this.categoryService.addCategory(newCategoryDto);
  }

  async removeSubcategory(id: number) {
    await this.categoryService.removeCategory(id);
  }
}
