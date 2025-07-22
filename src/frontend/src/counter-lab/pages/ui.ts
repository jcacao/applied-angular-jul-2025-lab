import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.decrementShouldBeDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.current() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
    </div>
    <div>
      @switch (store.fizzBuzz()) {
        @case ('Fizz') {
          <div class="alert alert-info">You Have Fizz!</div>
        }
        @case ('Buzz') {
          <div class="alert alert-info">You Have Buzz!</div>
        }
        @case ('FizzBuzz') {
          <div class="alert alert-success">You Have Fizz BUZZ!</div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
}
