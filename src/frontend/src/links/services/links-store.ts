import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type SortOptions = 'newest' | 'oldest';
type LinkState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withState<LinkState>({
    sortOrder: 'newest',
  }),
  withMethods((state) => {
    // stuff coming here later.
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
