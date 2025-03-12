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
    console.info(newCategoryDto);
    return await invoke<CategoryDto>('add_category', {
      newCategory: newCategoryDto,
    });
  }

  async remove(categoryId: number) {
    return await invoke<CategoryDto>('remove_category', { category_id: categoryId });
  }
}
