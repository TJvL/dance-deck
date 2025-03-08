import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CategoryTreeNodeComponent } from './category-tree-node/category-tree-node.component';
import { CategoryDto } from './category.dto';
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

  get rootCategory() {
    return this.categoryService.rootCategory;
  }

  async addSubcategory({ parent, newName }: { parent: CategoryDto; newName: string }) {
    await this.categoryService.addCategory(parent, newName);
  }

  async removeCategory(_id: number) {}

  async editCategory(_category: CategoryDto) {}
}
