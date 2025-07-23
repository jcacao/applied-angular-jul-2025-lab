import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-links-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Editing A Link with an Id of {{ id() }}</p> `,
  styles: ``,
})
export class Edit {
  id = input.required<string>();

  constructor() {
    effect(() => {
      const id = this.id();
      // store.setSelectedId(id);
    });
  }
}
