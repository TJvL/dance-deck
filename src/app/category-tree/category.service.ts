import { Injectable, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { CategoryDto, NewCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  private readonly root = signal<CategoryDto | null>(null);

  get rootCategory() {
    return this.root.asReadonly();
  }

  async getAllCategories() {
    try {
      const root = await invoke<CategoryDto>('get_all_categories');
      this.root.set(root);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  }

  async addCategory(newCategoryDto: NewCategoryDto) {
    try {
      const newRoot = await invoke<CategoryDto>('add_category', {
        newCategory: newCategoryDto,
      });
      this.root.set(newRoot);
    } catch (error) {
      console.error('Failed to add category', error);
    }
  }

  async removeCategory(categoryId: number) {
    try {
      const newRoot = await invoke<CategoryDto>('remove_category', { category_id: categoryId });
      this.root.set(newRoot);
    } catch (error) {
      console.error('Failed to remove category', error);
    }
  }
}
