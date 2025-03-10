import { Injectable, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  private readonly tree = signal<CategoryDto>({ id: 1, parentId: null, name: 'Dans', subCategories: [] });

  constructor() {
    listen<CategoryDto>('app://category-create', (event) => event);
  }

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
