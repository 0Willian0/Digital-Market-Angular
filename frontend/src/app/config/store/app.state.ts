export interface User {
    name: string;
    token?: string; 
  }
  
  export interface AppState {
    isMenuVisible: boolean;
    user: User | null;
  }
  
  export const initialState: AppState = {
    isMenuVisible: false,
    user: null,
  };