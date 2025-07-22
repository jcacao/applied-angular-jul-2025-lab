// ngc

import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p>List Goes Here</p>
    <pre>{{ linksResource.value() | json }}</pre>
  `,
  styles: ``,
})
export class List {
  linksResource = resource({
    loader: () =>
      fetch('https://links-api.fictionalcompany.com/api/links').then((r) =>
        r.json(),
      ),
  });
}
