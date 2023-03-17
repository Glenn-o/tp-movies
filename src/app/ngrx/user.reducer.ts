import { createReducer, on } from '@ngrx/store';
import { User } from '../shared/services/users.service';
import { UserReceived } from './user.action';

export interface IUserState {
    user: User | null;
}

export const initialUserState:IUserState = {
    user: null
};

export const userReducer = createReducer(
  initialUserState,
  on(UserReceived, (state, {user}) => {
      return {...state, user}
  })
);