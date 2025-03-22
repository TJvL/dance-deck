import { inject } from '@angular/core';
import { signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from '../info-display/error.dto';

import { LibraryService } from './library.service';

type LibraryState = {
  error: ApplicationErrorDto | null;
  isLoading: boolean;
};

const initialState: LibraryState = {
  error: null,
  isLoading: false,
};

export const LibraryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, libraryService = inject(LibraryService)) => ({
    async loadAll() {},
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
