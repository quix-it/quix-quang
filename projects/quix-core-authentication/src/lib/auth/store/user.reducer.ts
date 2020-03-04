import * as UserAction from './user.action';
import {Action, createReducer, on} from '@ngrx/store';

export interface UserState {
  user: any;
}

export const userInitialState: UserState = {user: null};
const reducer = createReducer(
  userInitialState,
  on(UserAction.userLogin, (state, action) => ({...state, user: action.userData})),
  on(UserAction.userLogout, (state, action) => ({...state, user: null})),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
