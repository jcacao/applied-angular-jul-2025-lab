import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ current: 0 }),
  withMethods((store) => {
    return {
      increment: () => patchState(store, { current: store.current() + 1 }),
      decrement: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.current() === 0),
      fizzBuzz: computed(() => {
        const c = store.current();
        if (c === 0) return '';
        if (c % 3 === 0 && c % 5 === 0) return 'FizzBuzz';
        if (c % 3 === 0) return 'Fizz';
        if (c % 5 === 0) return 'Buzz';
        return '';
      }),
    };
  }),
);
