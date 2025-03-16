import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from '../info-display/error.dto';

import { DanceDto } from './dance.dto';
import { DanceService } from './dance.service';

type DancesState = {
  dances: DanceDto[];
  error: ApplicationErrorDto | null;
  isLoading: boolean;
};

const initialState: DancesState = {
  dances: [],
  error: null,
  isLoading: false,
};

export const DancesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, danceService = inject(DanceService)) => ({
    async loadAll() {
      patchState(store, { isLoading: true });
      const dances = await danceService.getAll();
      patchState(store, { dances, isLoading: false });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
