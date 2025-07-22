import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  resource,
} from '@angular/core';

@Component({
  selector: 'app-demos-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
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

    @if (todos.isLoading()) {
      <p>We are loading</p>
    } @else {
      <p>You have {{ numberOfCompletedTodos() }}</p>
      <pre>{{ todos.value() | json }}</pre>
    }
  `,
  styles: ``,
})
export class SignalsDemo {
  todos = resource<{ completed: boolean }[], unknown>({
    loader: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((r) => r.json()),
  });

  numberOfCompletedTodos = computed(() => {
    const todos = this.todos.value() || [];
    return todos.filter((t) => t.completed === true).length;
  });
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
