import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [],
  template: `
    <div class="flex flex-row gap-4">
      <a class="link" routerLink="list">List</a>
      <a class="link" routerLink="prefs">prefs</a>
    </div>

    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Links {}
