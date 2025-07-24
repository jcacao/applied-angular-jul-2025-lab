import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutedLink } from './routed-link';
import { Store } from '@ngrx/store';
import { IdentityActions } from '../../shared/identity/actions';
import { selectIsLoggedIn, selectSub } from '../../shared/identity/store';
import { selectLinksNavbar } from '../../shared/nav-bar/store';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RoutedLink],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            @for (link of links(); track link.label) {
              <li>
                <app-routed-link [href]="link.href" [label]="link.label" />
              </li>
            }
          </ul>
        </div>
        <a routerLink="" class="btn btn-ghost text-xl">Home</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          @for (link of links(); track link.label) {
            <li><app-routed-link [href]="link.href" [label]="link.label" /></li>
          }
        </ul>
      </div>
      <div class="navbar-end">
        @if (isLoggedIn()) {
          @let summary = linksSummary();
          <span class="alert alert-success"
            >You are watching {{ summary.numberOfWatchedTags }} tags and
            ignoring {{ summary.numberOfIgnoredTags }} tags</span
          >
          <button (click)="logOut()" class="btn">Log Out {{ sub() }}</button>
        } @else {
          <button (click)="logIn()" class="btn">Login</button>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBar {
  logOut() {
    this.reduxStore.dispatch(IdentityActions.logouotRequested());
  }
  reduxStore = inject(Store);

  linksSummary = this.reduxStore.selectSignal(selectLinksNavbar);
  sub = this.reduxStore.selectSignal(selectSub);
  isLoggedIn = this.reduxStore.selectSignal(selectIsLoggedIn);

  logIn() {
    this.reduxStore.dispatch(IdentityActions.loginRequested());
  }
  links = signal([
    { href: ['about'], label: 'About' },
    { href: ['demos'], label: 'Demos' },
    { href: ['links'], label: 'Share Links' },
    //{ href: ['counter-lab'], label: 'Counter Lab' },
    { href: ['books'], label: 'Books' },
    { href: ['counter-lab'], label: 'Counter Lab' },
  ]);
}
