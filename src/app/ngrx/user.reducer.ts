import { createReducer, on, createSelector } from '@ngrx/store';
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

export interface AppSate {
    selectedUser: IUserState;
}

export const selectUser = (state: AppSate) => state.selectedUser;

export const selectUserInfo = createSelector(
    selectUser,
    (state: IUserState) => state.user
);