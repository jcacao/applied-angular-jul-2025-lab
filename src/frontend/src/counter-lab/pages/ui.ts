import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.decrementDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
    </div>
    <div>
      <p>{{ store.fizzBuzz() }}</p>
    </div>
  `,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
  current = signal(0);

  // increment() {
  //   this.current.update((c) => c + 1);
  // }
  // decrement() {
  //   this.current.update((c) => c - 1);
  // }
  // decrementDisabled = computed(() => this.current() === 0);

  // fizzBuzz = computed(() => {
  //   const c = this.current();
  //   if (c === 0) return '';
  //   if (c % 3 === 0 && c % 5 === 0) return 'FizzBuzz';
  //   if (c % 3 === 0) return 'Fizz';
  //   if (c % 5 === 0) return 'Buzz';
  //   return '';
  // });
}
