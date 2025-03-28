import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ErrorStore } from '../info-display/error.store';
import { checkIfKnownError } from '../info-display/utility';

import { ImportedTrackDto } from './library.dto';
import { LibraryService } from './library.service';

type LibraryState = {
  importedTrackDto: ImportedTrackDto[];
  libraryRoot: string;
  isLoading: boolean;
};

const initialState: LibraryState = {
  importedTrackDto: [],
  libraryRoot: '',
  isLoading: false,
};

export const LibraryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, libraryService = inject(LibraryService), errorStore = inject(ErrorStore)) => ({
    async getLibraryRoot() {
      try {
        const libraryRoot = await libraryService.getLibraryRoot();
        patchState(store, { libraryRoot });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
      }
    },
    async chooseLibraryRoot() {
      try {
        const libraryRoot = await libraryService.chooseLibraryRoot();
        if (libraryRoot) patchState(store, { libraryRoot });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.getLibraryRoot();
    },
  })
);
