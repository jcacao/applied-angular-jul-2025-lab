import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { identityFeature } from '../shared/identity/store';
import { IdentityEffects } from '../shared/identity/identity-effects';
import { navBarFeature } from '../shared/nav-bar/store';

// Services that are truly "global" in our application should be registered here.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
    ),
    provideHttpClient(withFetch()),
    provideStore(),
    provideStoreDevtools(),
    provideEffects([IdentityEffects]),
    provideState(identityFeature),
    provideState(navBarFeature),
  ],
};
