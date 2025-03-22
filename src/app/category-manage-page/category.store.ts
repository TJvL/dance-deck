import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from '../info-display/error.dto';
import { ErrorStore } from '../info-display/error.store';
import { checkIfKnownError } from '../info-display/utility';

import { CategoryEntryDto, CategoryNodeDto, NewCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

type CategoriesState = {
  rootCategoryNode: CategoryNodeDto | null;
  categoryList: CategoryEntryDto[];
  error: ApplicationErrorDto | null;
  isLoading: boolean;
};

const initialState: CategoriesState = {
  rootCategoryNode: null,
  categoryList: [],
  error: null,
  isLoading: false,
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, categoryService = inject(CategoryService), errorStore = inject(ErrorStore)) => ({
    async loadAll() {
      patchState(store, { isLoading: true });
      try {
        const rootCategoryNode = await categoryService.getRootNode();
        const categoryList = await categoryService.getList();
        patchState(store, { rootCategoryNode: rootCategoryNode, categoryList, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async create(newCategoryDto: NewCategoryDto) {
      patchState(store, { isLoading: true });
      try {
        await categoryService.add(newCategoryDto);
        const rootCategoryNode = await categoryService.getRootNode();
        patchState(store, { rootCategoryNode, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async delete(categoryId: number) {
      patchState(store, { isLoading: true });
      try {
        await categoryService.remove(categoryId);
        const rootCategoryNode = await categoryService.getRootNode();
        patchState(store, { rootCategoryNode, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
