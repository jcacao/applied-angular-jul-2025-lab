import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureNav } from '../shared/components/feature-nav';
import { selectIsLoggedIn } from '../shared/identity/store';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureNav],
  providers: [],
  template: `
    <app-feature-nav [links]="displayLinks()" sectionName="Links">
      @if (isLoggedIn() === false) {
        <p>You must be logged in to see the preferences link or add links</p>
      }
    </app-feature-nav>
  `,
  styles: ``,
})
export class Links {
  reduxStore = inject(Store);
  isLoggedIn = this.reduxStore.selectSignal(selectIsLoggedIn);
  links = signal([
    { href: ['list'], label: 'List' },
    { href: ['prefs'], label: 'Preferences' },
    { href: ['add'], label: 'Add' },
  ]);

  displayLinks = computed(() => {
    return this.links().filter((link) => {
      if (link.label === 'Preferences' || link.label === 'Add') {
        return this.isLoggedIn();
      }
      return true;
    });
  });
}
