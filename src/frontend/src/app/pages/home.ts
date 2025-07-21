import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>The Home Page</p> `,
  styles: ``,
})
export class Home {}
