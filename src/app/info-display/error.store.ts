import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { ApplicationErrorDto } from './error.dto';

type ErrorState = {
  applicationError: ApplicationErrorDto | null;
};

const initialState: ErrorState = {
  applicationError: null,
};

export const ErrorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setError(applicationError: ApplicationErrorDto | null) {
      patchState(store, { applicationError });
    },
  }))
);
