import {userReducer, UserState} from './store/user.reducer';
import {roleReducer, RoleState} from './store/role.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const QUIX_AUTH_STATE = 'quixAuthStateModule';

export interface QuixAuthState {
  userState: UserState,
  roleState: RoleState,
}

export interface QuixAuthStateModule {
  [QUIX_AUTH_STATE]: QuixAuthState;
}

export const quixAuthReducers: ActionReducerMap<QuixAuthState> = {
  userState: userReducer,
  roleState: roleReducer
};

