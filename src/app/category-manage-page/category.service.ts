import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { CategoryNodeDto, CategoryEntryDto, NewCategoryDto } from './category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  async getRootNode() {
    return await invoke<CategoryNodeDto>('get_category_root_node');
  }

  async getList() {
    return await invoke<CategoryEntryDto[]>('get_all_categories');
  }

  async add(newCategoryDto: NewCategoryDto) {
    return await invoke<void>('add_category', {
      newCategory: newCategoryDto,
    });
  }

  async remove(categoryId: number) {
    return await invoke<void>('remove_category', { categoryId });
  }
}
