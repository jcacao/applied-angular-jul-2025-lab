import { Routes } from '@angular/router';
import { Books } from './books';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    children: [],
  },
];
