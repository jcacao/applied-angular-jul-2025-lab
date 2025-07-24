// ngfr
import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { Links } from './links';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
import { Edit } from './pages/edit';
import { isLoggedInGuard } from '../shared/routing/logged-in-guard';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSub } from '../shared/identity/store';
import { LinksStore } from './services/links-store';
import { LinkApiService } from './services/links-api';
import { Add } from './pages/add';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    providers: [LinksStore, LinkApiService],
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'prefs',
        component: Prefs,
        canActivate: [isLoggedInGuard],
      },
      {
        path: ':id/edit',
        component: Edit,
        canActivate: [isLoggedInGuard, isOwnerOfLinkGuard()],
      },
      { path: 'add', component: Add, canActivate: [isLoggedInGuard] },
    ],
  },
];

function isOwnerOfLinkGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const store = inject(LinksStore);
    const userSub = inject(Store).selectSignal(selectSub);
    const linkId = route.paramMap.get('id');
    if (linkId === null || userSub() === null) {
      return false;
    }
    const link = store.entityMap()[linkId];
    if (!link) {
      return false;
    }
    return link.owner === userSub();
  };
}
