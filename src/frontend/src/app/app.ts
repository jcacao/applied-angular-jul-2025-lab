import { Component, inject } from '@angular/core';
import { NavBar } from './components/nav-bar';
import { RouterOutlet } from '@angular/router';
import { CounterStore } from '../counter-lab/services/counter-store';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar />

    <main class="container mx-auto pt-4">
      <p>Counter is: {{ store.current() }}</p>
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavBar, RouterOutlet],
})
export class App {
  store = inject(CounterStore);
}
