import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { NavbarLinksActions } from '../../shared/nav-bar/actions/links';
import { TagPrefsState } from '../../shared/nav-bar/store';

type UserPrefsState = {
  watchedTags: string[];
  ignoredTags: string[];
};
const initialState: UserPrefsState = {
  watchedTags: [],
  ignoredTags: [],
};
export function withUserPrefs() {
  return signalStoreFeature(
    withState<UserPrefsState>(initialState),
    withMethods((store) => {
      const reduxStore = inject(Store);
      return {
        addToWatched: (tag: string) => {
          patchState(store, { watchedTags: [tag, ...store.watchedTags()] });
          if (store.ignoredTags().includes(tag)) {
            patchState(store, {
              ignoredTags: store.ignoredTags().filter((t) => t !== tag),
            });
          }
        },
        removeFromWatched: (tag: string) => {
          patchState(store, {
            watchedTags: store.watchedTags().filter((t) => t !== tag),
          });
        },
        addToIgnored: (tag: string) => {
          patchState(store, { ignoredTags: [tag, ...store.ignoredTags()] });
          if (store.watchedTags().includes(tag)) {
            patchState(store, {
              watchedTags: store.watchedTags().filter((t) => t !== tag),
            });
          }
        },
        removeFromIgnored: (tag: string) => {
          patchState(store, {
            ignoredTags: store.ignoredTags().filter((t) => t !== tag),
          });
        },
        _tellTheNavbar: () => {
          const payload = {
            numberOfIgnoredTags: store.ignoredTags().length,
            numberOfWatchedTags: store.watchedTags().length,
          } as TagPrefsState;
          reduxStore.dispatch(NavbarLinksActions.tagPrefsChanged({ payload }));
        },
      };
    }),
    withHooks({
      onInit(store) {
        effect(() => {
          console.log('User prefs changed, notifying navbar...');
          store._tellTheNavbar();
        });
      },
    }),
  );
}
