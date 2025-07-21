import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>About Page Here</p> `,
  styles: ``,
})
export class About {}
