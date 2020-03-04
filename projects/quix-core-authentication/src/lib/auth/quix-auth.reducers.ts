import {userReducer, UserState} from './store/user.reducer';
import {roleReducer, RoleState} from './store/role.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface QuixAuthState {
  userState: UserState,
  roleState: RoleState,
}

export const quixAuthReducers: ActionReducerMap<QuixAuthState> = {
  userState: userReducer,
  roleState: roleReducer
};

export const QUIX_AUTH_REDUCERS = 'quixAuth_reducers'
