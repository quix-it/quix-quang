
import {Action, createReducer, on} from '@ngrx/store';
import {UserInfo} from "angular-oauth2-oidc";
import {userInfoLogin, userInfoLogout, userLogin, userLogout} from "./user.action";

export interface UserState {
  isLogged: boolean;
  user: UserInfo;
}

export const userInitialState: UserState = {isLogged: false, user: null};
const reducer = createReducer(
  userInitialState,
  on(userLogin, (state, action) => ({...state, isLogged: action.isLogged})),
  on(userLogout, (state, action) => ({...state, isLogged: false})),
  on(userInfoLogin, (state, action) => ({...state, user: action.userData})),
  on(userInfoLogout, (state, action) => ({...state, user: null})),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
