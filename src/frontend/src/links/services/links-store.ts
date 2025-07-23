import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { LinkApiService } from './links-api';
type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withDevtools('links-store'),
  withEntities<ApiLink>(),
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);
    return {
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder }),
    };
  }),
  withHooks({
    onInit() {
      console.log('The Links Store Is Created!');
    },
    onDestroy() {
      console.log('The Links Store is DESTROYED');
    },
  }),
);
