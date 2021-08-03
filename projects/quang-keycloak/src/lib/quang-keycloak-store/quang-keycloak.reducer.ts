import {Action, createReducer, on} from "@ngrx/store";
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from "./quang-keycloak.action";

/**
 * defines the state of the keycloak authentication store
 */
export interface QuangKeycloakUserState {
  isAuthenticated: boolean
  user: any
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
  on(userLogin, (state) => ({...state, isAuthenticated: true})),
  on(userLogout, (state) => ({...state, isAuthenticated: false})),
  on(userInfoLogin, (state, action) =>
    ({...state, user: action.user})),
  on(userInfoLogout, (state) => ({...state, user: null})),
  on(userRolesLogin, (state, action) =>
    ({...state, roles: action.roles})),
  on(userRolesLogout, (state) => ({...state, user: null})),
)
/**
 * defines the name of the state reducer
 */
export function quangKeycloakUserReducer(state: QuangKeycloakUserState | undefined, action: Action) {
  return reducer(state, action)
}
