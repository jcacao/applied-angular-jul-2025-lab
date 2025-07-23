// ngfr
import { Routes } from '@angular/router';
import { Links } from './links';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
import { Edit } from './pages/edit';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
      {
        path: ':id/edit',
        component: Edit,
      },
    ],
  },
];
