import { Action, createReducer, on } from '@ngrx/store'
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from './quang-auth.action'

/**
 * store state
 */
export interface QuangAuthUserState {
  /**
   * define if user is authenticated
   */
  isAuthenticated: boolean
  /**
   * user data
   */
  user: any
  /**
   * user roles
   */
  roles: any[]
}

/**
 * store state initial value
 */
const initialValue: QuangAuthUserState = {
  isAuthenticated: false,
  user: null,
  roles: []
}
/**
 * Defines how the state changes based on the actions called
 */
const reducer = createReducer(
  initialValue,
  on(userLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(userLogout, (state) => ({ ...state, isAuthenticated: false })),
  on(userInfoLogin, (state, action) =>
    ({ ...state, user: action.user })),
  on(userInfoLogout, (state) => ({ ...state, user: null })),
  on(userRolesLogin, (state, action) =>
    ({ ...state, roles: action.roles })),
  on(userRolesLogout, (state) => ({ ...state, user: null }))
)

/**
 * Defines the name of the reducer
 * @param state module state
 * @param action section action
 */
export function quangAuthUserReducer (state: QuangAuthUserState | undefined, action: Action): any {
  return reducer(state, action)
}
