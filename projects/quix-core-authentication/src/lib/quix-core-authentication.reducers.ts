import {roleReducer, RoleState} from './auth/store/role.reducer';
import {userReducer, UserState} from './auth/store/user.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const COREAUTHENTICATION_KEY = 'quixCoreAuthentication';

export interface QuixCoreAuthenticationState {
  roleState: RoleState;
  userState: UserState;
}

export interface QuixCoreAuthenticationStateModule {
  [COREAUTHENTICATION_KEY]: QuixCoreAuthenticationState;
}

export const QuixCoreAuthenticationReducers: ActionReducerMap<QuixCoreAuthenticationState> = {
  roleState: roleReducer,
  userState: userReducer,
};
