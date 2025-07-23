import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { ApiLink } from '../types';
import { LinkApiService } from './links-api';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import {
  setFetching,
  setIsFulfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';
import {
  clearFilteringTag,
  setFilterTag,
  withLinkFiltering,
} from './link-filter-feature';
type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withApiState(),
  withLinkFiltering(),
  withDevtools('links-store'),
  withEntities<ApiLink>(),
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);
    return {
      setFilterTag: (tag: string) => patchState(state, setFilterTag(tag)),
      clearFilterTag: () => patchState(state, clearFilteringTag()),
      _load: rxMethod<{ isBackgroundFetch: boolean }>(
        pipe(
          tap((p) =>
            patchState(
              state,
              p.isBackgroundFetch ? setFetching() : setIsLoading(),
            ),
          ),
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
      store._load({ isBackgroundFetch: false });
      console.log('The Links Store Is Created!');
      // potential bug here, but I know it, and knowing is half the battle.
      setInterval(() => {
        store._load({ isBackgroundFetch: true });
      }, 5000);
    },
    onDestroy() {
      console.log('The Links Store is DESTROYED');
    },
  }),
);
