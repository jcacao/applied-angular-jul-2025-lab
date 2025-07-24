import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from './services/counter-store';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  providers: [],
  template: `
    <div class="flex flex-row gap-4">
      <a class="link" routerLink="ui">UI</a>
      <a class="link" routerLink="prefs">Prefs</a>
    </div>
    <p>Count is {{ store.current() }}</p>
    <router-outlet />
  `,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);
}
