import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FeatureNav } from '../shared/components/feature-nav';
import { CounterStore } from './services/counter-store';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureNav],
  providers: [],
  template: `
    <app-feature-nav
      [links]="links()"
      sectionName="Counter Lab"
      omitRouterOutlet
    >
      <p>Your Counter is {{ store.current() }}</p>
    </app-feature-nav>
  `,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);

  links = signal([
    { label: 'UI', href: ['ui'] },
    { label: 'Prefs', href: ['prefs'] },
  ]);
}
