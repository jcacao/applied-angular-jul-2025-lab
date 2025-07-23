import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { setEntities, withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { LinkApiService } from './links-api';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import {
  setIsFulfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';
type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withApiState(),
  withDevtools('links-store'),
  withEntities<ApiLink>(),
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setIsLoading())),
          exhaustMap(() =>
            service
              .getLinks()
              .pipe(
                tap((r) => patchState(state, setEntities(r), setIsFulfilled())),
              ),
          ),
        ),
      ),
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
      console.log('The Links Store Is Created!');
    },
    onDestroy() {
      console.log('The Links Store is DESTROYED');
    },
  }),
);
