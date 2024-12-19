import { createReducer, on } from '@ngrx/store';
import { setUser, toggleMenu } from './app.actions';

interface User{
  name:string
}

export interface AppState {
  isMenuVisible: boolean,
  user: User | null
}

export const initialState: AppState = {
  isMenuVisible: true,
  user:null
};

export const appReducer = createReducer(
  initialState,
  on(toggleMenu, (state, action) => {
    const isVisible = action.isVisible;
    return {
      ...state,
      isMenuVisible: isVisible !== undefined ? isVisible : !state.isMenuVisible,
    };
  }),
  
  on(setUser, (state, { user }) => {
    return {
      ...state,
      user,
      isMenuVisible: !user,
    };
  })
);
