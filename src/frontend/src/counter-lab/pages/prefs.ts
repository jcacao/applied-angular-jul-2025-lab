import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    @for (by of store.countByValues; track by) {
      <button
        [disabled]="store.by() === by"
        (click)="store.setBy(by)"
        class="btn join-item"
      >
        {{ by }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class Prefs {
  store = inject(CounterStore);
}
