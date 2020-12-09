import {createAction, props} from '@ngrx/store';



export const userInfoLogin = createAction(
  '[USER LOGIN INFO] user info call success',
  props<{ userData: any }>()
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
