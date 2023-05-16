import { createAction, props } from '@ngrx/store'

/**
 * Saves the user's successful login in the store
 */
export const userLogin = createAction('[QUANG KEYCLOAK] user login')
/**
 * Saves the user logout in the store
 */
export const userLogout = createAction('[QUANG KEYCLOAK] user logout', props<{ redirectUri?: string }>())
/**
 * Saves the user data in the store
 */
export const userInfoLogin = createAction('[QUANG KEYCLOAK] set user info', props<{ user: any }>())
/**
 * Delete the user data in the store
 */
export const userInfoLogout = createAction('[QUANG KEYCLOAK] delete user info')
/**
 * Saves the user roles in the store
 */
export const userRolesLogin = createAction('[QUANG KEYCLOAK] set user roles', props<{ roles: any[] }>())
/**
 * Delete the user roles in the store
 */
export const userRolesLogout = createAction('[QUANG KEYCLOAK] delete user roles')
