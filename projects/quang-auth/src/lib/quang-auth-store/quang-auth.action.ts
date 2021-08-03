import { createAction, props } from '@ngrx/store'

/**
 * The user has completed the login procedure
 */
export const userLogin = createAction('[QUANG AUTH] user login')
/**
 * The user asks to log out
 */
export const userLogout = createAction('[QUANG AUTH] user logout')
/**
 * saves user data in the store
 */
export const userInfoLogin = createAction('[QUANG AUTH] set user info', props<{ user: any }>())
/**
 * delete user data in the store
 */
export const userInfoLogout = createAction('[QUANG AUTH] delete user info')
/**
 * saves user role in the store
 */
export const userRolesLogin = createAction('[QUANG AUTH] set user roles', props<{ roles: any[] }>())
/**
 * delete user role in the store
 */
export const userRolesLogout = createAction('[QUANG AUTH] delete user roles')

