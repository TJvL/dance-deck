import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { CategoryDto, NewCategoryDto } from './category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  async getAll() {
    return await invoke<CategoryDto>('get_all_categories');
  }

  async add(newCategoryDto: NewCategoryDto) {
    return await invoke<CategoryDto>('add_category', {
      newCategory: newCategoryDto,
    });
  }

  async remove(categoryId: number) {
    return await invoke<CategoryDto>('remove_category', { categoryId });
  }

  async getAllNames() {
    return await invoke<string[]>('get_all_category_names');
  }
}
