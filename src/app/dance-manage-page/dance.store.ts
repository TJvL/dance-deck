import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from '../info-display/error.dto';
import { checkIfKnownError } from '../info-display/utility';

import { DanceEntryDto, NewDanceRecordDto } from './dance.dto';
import { DanceService } from './dance.service';

type DancesState = {
  dances: DanceEntryDto[];
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
      try {
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
      } catch (error) {
        patchState(store, {
          error: checkIfKnownError(error),
          isLoading: false,
        });
      }
    },
    async create(newDanceRecord: NewDanceRecordDto) {
      patchState(store, { isLoading: true });
      try {
        await danceService.add(newDanceRecord);
        patchState(store, { isLoading: false });
      } catch (error) {
        patchState(store, {
          error: checkIfKnownError(error),
          isLoading: false,
        });
      }
    },
    async delete(danceId: number) {
      try {
        await danceService.remove(danceId);
        patchState(store, { isLoading: false });
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
