import { createReducer, on } from '@ngrx/store';
import { Trending } from 'src/types/Movies';
import { UserReceived } from './user.action';

export interface IMoviesState {
    user:  | null;
}

export const initialUserState:IMoviesState = {
    user: null
};

export const userReducer = createReducer(
  initialUserState,
  on(UserReceived, (state, {user}) => {
      return {...state, user}
  })
);