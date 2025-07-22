import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

const ValidCountByValues = [1, 3, 5] as const;
type ByValues = (typeof ValidCountByValues)[number];
type CounterState = {
  by: ByValues;
  current: number;
};

export const CounterStore = signalStore(
  withState<CounterState>({
    by: 1,
    current: 0,
  }),
  withMethods((store) => {
    return {
      setBy: (by: ByValues) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
    };
  }),
  withComputed((store) => {
    return {
      decrementShouldBeDisabled: computed(
        () => store.current() - store.by() <= 0,
      ),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) {
          return 'None';
        }
        if (isFizzBuzz(current)) {
          return 'FizzBuzz';
        }
        if (isFizz(current)) {
          return 'Fizz';
        }
        if (isBuzz(current)) {
          return 'Buzz';
        }
        return 'None';
      }),
    };
  }),
  withProps(() => {
    return {
      countByValues: ValidCountByValues,
    };
  }),

  withHooks({
    onInit(store) {
      const savedStateJson = localStorage.getItem('counter-state');
      if (savedStateJson != null) {
        // yucky - we'll talk about this.
        const savedState = JSON.parse(
          savedStateJson,
        ) as unknown as CounterState;
        patchState(store, savedState);
      }

      watchState(store, (state) => {
        localStorage.setItem('counter-state', JSON.stringify(state));
      });
    },
  }),
);

function isFizz(n: number) {
  return n % 3 === 0;
}
function isBuzz(n: number) {
  return n % 5 === 0;
}

function isFizzBuzz(n: number) {
  return isFizz(n) && isBuzz(n);
}
