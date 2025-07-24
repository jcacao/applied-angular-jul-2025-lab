import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { About } from './pages/about';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'demos',
    loadChildren: () => import('../demos/routes').then((r) => r.DEMOS_ROUTES),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('../links/links.routes').then((r) => r.LINKS_ROUTES),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('../books/books.routes').then((r) => r.BOOKS_ROUTES),
  },
  {
    path: 'counter-lab',
    loadChildren: () =>
      import('../counter-lab/counter.routes').then((r) => r.COUNTER_ROUTES),
  },
];
