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
import { Store } from '@ngrx/store';
import { exhaustMap, interval, pipe, tap } from 'rxjs';
import { selectSub } from '../../shared/identity/store';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withUserPrefs } from './user-prefs-feature';
type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
};

type LinkModel = ApiLink & { isOwnedByCurrentUser: boolean };

export const LinksStore = signalStore(
  withApiState(),
  withLinkFiltering(),
  withUserPrefs(),
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
    // Injection Context
    const reduxStore = inject(Store);
    const userSub = reduxStore.selectSignal(selectSub);
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
        const sub = userSub();
        if (sub === null) {
          return store.entities().map(mapApiLinkToModelNoIdentity);
        }
        const filtered = store
          .entities()
          // Going to leave this as a bug until tomorrow - before refactor.
          .filter((link) => (tag !== null ? link.tags.includes(tag) : true))
          .map((l) => mapApiLinkToModelWithIdentity(l, sub));
        return filtered;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load({ isBackgroundFetch: false });
      console.log('The Links Store Is Created!');
      // This is better than what I had with the setInterval - the takeUntilDestroyed will clean this up for us.
      interval(5000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => store._load({ isBackgroundFetch: true }));
    },
    onDestroy() {
      console.log('The Links Store is DESTROYED');
    },
  }),
);

function mapApiLinkToModelNoIdentity(link: ApiLink): LinkModel {
  return { ...link, isOwnedByCurrentUser: false };
}

function mapApiLinkToModelWithIdentity(link: ApiLink, sub: string): LinkModel {
  return { ...link, isOwnedByCurrentUser: link.owner === sub };
}
