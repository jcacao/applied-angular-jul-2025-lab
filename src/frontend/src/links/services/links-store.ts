import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { setEntities, withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { LinkApiService } from './links-api';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import {
  setIsFulfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';
type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
  filterTag: string | null;
};

export const LinksStore = signalStore(
  withApiState(),
  withDevtools('links-store'),
  withEntities<ApiLink>(),
  withState<LinkState>({
    sortOrder: 'newest',
    filterTag: null,
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);
    return {
      setFilterTag: (tag: string) => patchState(state, { filterTag: tag }),
      clearFilterTag: () => patchState(state, { filterTag: null }),
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
  withComputed((store) => {
    return {
      tags: computed(() => {
        const links = store.entities();
        const allTags = links.reduce((prev: string[], curr) => {
          return [...prev, ...curr.tags];
        }, []);
        return new Set(allTags);
      }),
      filteredLinks: computed(() => {
        const tag = store.filterTag();

        if (tag === null) return store.entities();
        const filtered = store
          .entities()
          .filter((link) => link.tags.includes(tag));
        return filtered;
      }),
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
