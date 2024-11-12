import { createReducer, on } from '@ngrx/store';
import { toggleMenu } from './app.actions';

interface User{
  name:string
}

export interface AppState {
  isMenuVisible: boolean,
  user: User
}

export const initialState: AppState = {
  isMenuVisible: false,
  user:{
    name:'Yuna'
  }
};

export const appReducer = createReducer(
  initialState,
  on(toggleMenu, (state, action) => {
    const isVisible = action.isVisible;
    return {
      ...state,
      isMenuVisible: isVisible !== undefined ? isVisible : !state.isMenuVisible,
    };
  })
);
