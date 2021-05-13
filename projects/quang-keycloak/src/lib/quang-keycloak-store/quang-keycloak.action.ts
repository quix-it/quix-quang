import { createAction, props } from '@ngrx/store'

export const userLogin = createAction('[QUANG KEYCLOACK] user login')
export const userLogout = createAction('[QUANG KEYCLOACK] user logout', props<{ redirectUri?: string }>())
export const userInfoLogin = createAction('[QUANG KEYCLOACK] set user info', props<{ user: any }>())
export const userInfoLogout = createAction('[QUANG KEYCLOACK] delete user info',)
export const userRolesLogin = createAction('[QUANG KEYCLOACK] set user roles', props<{ roles: any[] }>())
export const userRolesLogout = createAction('[QUANG KEYCLOACK] delete user roles',)
