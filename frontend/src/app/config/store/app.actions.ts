import { createAction, props } from '@ngrx/store';

export const toggleMenu = createAction(
  '[App] Toggle Menu',
  props<{ isVisible?: boolean }>()
);


