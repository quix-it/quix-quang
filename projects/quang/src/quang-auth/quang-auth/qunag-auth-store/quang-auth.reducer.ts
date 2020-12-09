import {Action, createReducer, on} from "@ngrx/store";
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from "./quang-auth.action";

export interface QuangAuthUserState {
  isAuthenticated: boolean
  user: any
  roles: any[]
}

const initialValue: QuangAuthUserState = {
  isAuthenticated: false,
  user: null,
  roles: []
}
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

export function quangAuthUserReducer(state: QuangAuthUserState | undefined, action: Action) {
  return reducer(state, action)
}
