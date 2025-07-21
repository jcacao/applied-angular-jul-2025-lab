import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-demos-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <p>Your Score: {{ score() }}</p>
      <div>
        <button (click)="takeAShot()" class="btn btn-primary">
          Take a Stroke
        </button>

        @if (underPar()) {
          <div class="badge badge-success">You are under Par</div>
        } @else {
          <div class="badge badge-error">You are over Par</div>
        }

        <button
          [disabled]="score() === 0"
          (click)="score.set(0)"
          class="btn btn-info"
        >
          Reset
        </button>
        <p>tick {{ tick() }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignalsDemo {
  score = signal(0);
  par = signal(4);
  tick = signal(0);
  underPar = computed(() => this.score() <= this.par());
  takeAShot() {
    this.score.update((s) => s + 1);
  }
  constructor() {
    const intervalId = setInterval(() => this.tick.update((t) => t + 1), 1000);
    effect((onCleanup) => {
      onCleanup(() => {
        console.log('blah' + intervalId);
        clearInterval(intervalId);
      });
    });
    effect(() => {
      console.log(this.score());
    });
  }
}
