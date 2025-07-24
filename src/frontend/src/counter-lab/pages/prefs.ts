import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Counter Preferences</p>
    <div class="join">
      <button (click)="setBy(1)" [disabled]="by() === 1" class="btn join-item">
        1
      </button>
      <button (click)="setBy(3)" [disabled]="by() === 3" class="btn join-item">
        3
      </button>
      <button (click)="setBy(5)" [disabled]="by() === 5" class="btn join-item">
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class Prefs {
  by = signal<1 | 3 | 5>(1);

  setBy(value: 1 | 3 | 5) {
    this.by.set(value);
  }
}
