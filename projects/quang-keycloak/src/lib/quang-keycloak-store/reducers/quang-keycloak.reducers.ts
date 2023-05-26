import { Action, createReducer, on } from '@ngrx/store'
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout, userNotLogin,
  userRolesLogin,
  userRolesLogout
} from '../actions/quang-keycloak.actions'

/**
 * defines the state of the keycloak authentication store
 */
export interface QuangKeycloakUserState {
  /**
   * define is user is authenticated
   */
  isAuthenticated: boolean
  /**
   * define user data
   */
  user: any
  /**
   * define user roles
   */
  roles: any[]
}
/**
 * initial state of authentication store
 */
const initialValue: QuangKeycloakUserState = {
  isAuthenticated: false,
  user: null,
  roles: []
}
/**
 * defines how the state changes when actions are triggered
 */
const reducer = createReducer(
  initialValue,
  on(userLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(userNotLogin, (state) => ({ ...state, isAuthenticated: false })),
  on(userLogout, (state) => ({ ...state, isAuthenticated: false })),
  on(userInfoLogin, (state, action) =>
    ({ ...state, user: action.user })),
  on(userInfoLogout, (state) => ({ ...state, user: null })),
  on(userRolesLogin, (state, action) =>
    ({ ...state, roles: action.roles })),
  on(userRolesLogout, (state) => ({ ...state, roles: [] }))
)
/**
 * defines the name of the state reducer
 */
export function quangKeycloakUserReducer (state: QuangKeycloakUserState | undefined, action: Action): any {
  return reducer(state, action)
}
