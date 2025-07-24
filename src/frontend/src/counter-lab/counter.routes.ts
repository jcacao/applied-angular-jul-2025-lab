import { Routes } from '@angular/router';
import { Counter } from './counter';
import { Ui } from './pages/ui';
import { Prefs } from './pages/prefs';
import { CounterStore } from './services/counter.store';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: Counter,
    providers: [CounterStore],
    children: [
      {
        path: 'ui',
        component: Ui,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
