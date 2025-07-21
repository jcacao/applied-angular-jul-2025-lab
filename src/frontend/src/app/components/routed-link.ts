import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-routed-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="href()"
      routerLinkActive="underline"
      #rla="routerLinkActive"
      [class.opacity-60]="rla.isActive === false"
      >{{ label() }}</a
    >
  `,
  styles: ``,
})
export class RoutedLink {
  href = input.required<string[]>();
  label = input.required<string>();
}
