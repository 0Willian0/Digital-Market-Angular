import { createAction, props } from '@ngrx/store';
import { User } from './app.state';

export const toggleMenu = createAction(
  '[App] Toggle Menu',
  props<{ isVisible?: boolean }>()
);

export const setUser = createAction(
  '[App] Set User',
  props<{ user: User | null }>() 
);


