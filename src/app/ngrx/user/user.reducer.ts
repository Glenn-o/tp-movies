import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../shared/services/users.service';
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

export const userFeatureKey = "selectedUser"

export const selectUserState = createFeatureSelector<IUserState>(userFeatureKey)

export const selectUserInfo = createSelector(
    selectUserState,
    (state: IUserState) => state.user
);
export const selectUserHeader = createSelector(
    selectUserInfo,
    (user: User | null) => ({username : user?.username, avatar: user?.avatar})
);