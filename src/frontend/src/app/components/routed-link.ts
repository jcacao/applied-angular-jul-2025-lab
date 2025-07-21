import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-routed-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: ` <a [routerLink]="href()">{{ label() }}</a> `,
  styles: ``,
})
export class RoutedLink {
  href = input.required<string[]>();
  label = input.required<string>();
}
