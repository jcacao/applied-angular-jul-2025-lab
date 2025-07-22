import { Routes } from '@angular/router';
import { Counter } from './counter';
import { Ui } from './pages/ui';
import { Prefs } from './pages/prefs';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: Counter,
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
