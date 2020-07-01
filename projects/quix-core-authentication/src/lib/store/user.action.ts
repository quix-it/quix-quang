import {createAction, props} from '@ngrx/store';
import {UserInfo} from "angular-oauth2-oidc";


export const userInfoLogin = createAction(
  '[USER LOGIN INFO] user info call success',
  props<{ userData: UserInfo }>()
);
export const userInfoLogout = createAction(
  '[USER LOGOUT INFO] user info deleted'
);
export const userLogin = createAction(
  '[USER LOGIN] user authenticated on auth server',
  props<{ isLogged: boolean }>()
);
export const userLogout = createAction(
  '[USER LOGOUT] user leave'
);
