import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from '../info-display/error.dto';
import { checkIfKnownError } from '../info-display/utility';

import { CategoryDto, NewCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

type CategoriesState = {
  rootCategory: CategoryDto | null;
  categoryNames: string[];
  error: ApplicationErrorDto | null;
  isLoading: boolean;
};

const initialState: CategoriesState = {
  rootCategory: null,
  categoryNames: [],
  error: null,
  isLoading: false,
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, categoryService = inject(CategoryService)) => ({
    async loadAll() {
      patchState(store, { isLoading: true });
      try {
        const rootCategory = await categoryService.getAll();
        const categoryNames = await categoryService.getAllNames();
        patchState(store, { rootCategory, categoryNames, isLoading: false });
      } catch (error) {
        patchState(store, {
          error: checkIfKnownError(error),
          isLoading: false,
        });
      }
    },
    async create(newCategoryDto: NewCategoryDto) {
      patchState(store, { isLoading: true });
      try {
        const rootCategory = await categoryService.add(newCategoryDto);
        patchState(store, { rootCategory, isLoading: false });
      } catch (error) {
        patchState(store, {
          error: checkIfKnownError(error),
          isLoading: false,
        });
      }
    },
    async delete(categoryId: number) {
      patchState(store, { isLoading: true });
      try {
        const rootCategory = await categoryService.remove(categoryId);
        patchState(store, { rootCategory, isLoading: false });
      } catch (error) {
        patchState(store, {
          error: checkIfKnownError(error),
          isLoading: false,
        });
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
