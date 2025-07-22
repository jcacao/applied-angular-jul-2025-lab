// ngfr
import { Routes } from '@angular/router';
import { Links } from './links';
import { List } from './pages/list';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    children: [
      {
        path: '',
        component: List,
      },
    ],
  },
];
