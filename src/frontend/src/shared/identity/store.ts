import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { IdentityActions } from './actions';

export type IdentityState = {
  sub: string | null;
  roles: string[];
};

const initialState: IdentityState = {
  sub: null,
  roles: [],
};

export const identityFeature = createFeature({
  name: 'identity',
  reducer: createReducer(
    initialState,
    on(IdentityActions.loginSucceeded, (state, { payload }) => payload),
    on(IdentityActions.logouotRequested, () => initialState),
  ),
  extraSelectors: ({ selectSub }) => ({
    selectIsLoggedIn: createSelector(selectSub, (s) => s !== null),
  }),
});

export const { selectSub, selectRoles, selectIsLoggedIn } = identityFeature;
