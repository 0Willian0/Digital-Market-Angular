// app.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';


export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsMenuVisible = createSelector(
  selectAppState,
  (state: AppState) => {
    return state.isMenuVisible;
  }
);
export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => {
    return state.user;
  }
);
