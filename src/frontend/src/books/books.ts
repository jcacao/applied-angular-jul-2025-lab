import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BookApiItem } from './types';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: ` <pre>{{ booksResource.value() | json }}</pre> `,
  styles: ``,
})
export class Books {
  booksResource = resource<BookApiItem[], unknown>({
    loader: () => fetch('/api/books').then((r) => r.json()),
  });
}
