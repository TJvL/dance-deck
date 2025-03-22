import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { ErrorStore } from '../info-display/error.store';
import { checkIfKnownError } from '../info-display/utility';

import { DanceEntryDto, NewDanceRecordDto, NewSynonymRecordDto } from './dance.dto';
import { DanceService } from './dance.service';

type DancesState = {
  dances: DanceEntryDto[];
  isLoading: boolean;
};

const initialState: DancesState = {
  dances: [],
  isLoading: false,
};

export const DancesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, danceService = inject(DanceService), errorStore = inject(ErrorStore)) => ({
    async loadAll() {
      patchState(store, { isLoading: true });
      try {
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async create(newDanceRecord: NewDanceRecordDto) {
      patchState(store, { isLoading: true });
      try {
        await danceService.add(newDanceRecord);
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async delete(danceId: number) {
      patchState(store, { isLoading: true });
      try {
        await danceService.remove(danceId);
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async createSynonym(newSynonymRecord: NewSynonymRecordDto) {
      patchState(store, { isLoading: true });
      try {
        await danceService.addSynonym(newSynonymRecord);
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
      } catch (error) {
        errorStore.setError(checkIfKnownError(error));
        patchState(store, { isLoading: false });
      }
    },
    async deleteSynonym(synonymId: number) {
      patchState(store, { isLoading: true });
      try {
        await danceService.removeSynonym(synonymId);
        const dances = await danceService.getList();
        patchState(store, { dances, isLoading: false });
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
