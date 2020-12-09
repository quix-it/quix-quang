import {createAction, props} from "@ngrx/store";

export const userLogin = createAction('[QUANG AUTH] user login')
export const userLogout = createAction('[QUANG AUTH] user logout')
export const userInfoLogin = createAction('[QUANG AUTH] set user info', props<{ user: any }>())
export const userInfoLogout = createAction('[QUANG AUTH] delete user info',)
export const userRolesLogin = createAction('[QUANG AUTH] set user roles', props<{ roles: any[] }>())
export const userRolesLogout = createAction('[QUANG AUTH] delete user roles',)

