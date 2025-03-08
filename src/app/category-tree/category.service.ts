import { Injectable, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  private readonly tree = signal<CategoryDto>({ id: 1, name: 'Dance', subCategories: [] });

  get rootCategory() {
    return this.tree.asReadonly();
  }

  async addCategory(parent: CategoryDto, newName: string) {
    const newTree = (await invoke('add_category', { name: newName, parentId: parent.id })) as CategoryDto;
    this.tree.update((_) => newTree);
  }

  async removeCategory(id: number) {
    await invoke('remove_category', { id });
  }
}
