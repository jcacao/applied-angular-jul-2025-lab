// ngfr
import { Routes } from '@angular/router';
import { Links } from './links';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    children: [
      {
        path: '',
        component: List,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
