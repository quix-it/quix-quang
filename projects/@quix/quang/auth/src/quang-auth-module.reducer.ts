import { QUANGAUTH_KEY } from './quang-auth-module.selector'
import { ActionReducerMap } from '@ngrx/store'
import { QuangAuthUserState } from './quang-auth-store/reducers/quang-auth.reducers'
import { QuangAuthReducers } from './quang-auth-store/reducers'

/**
 * interface that defines the state of the module
 */
export interface QuangAuthState {
  /**
   * user state
   */
  quangAuthUserState: QuangAuthUserState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangAuthModuleState {
  /**
   * link key to state definition
   */
  [QUANGAUTH_KEY]: QuangAuthState
}

/**
 * definition of the reducer map
 */
export const quangAuthReducer: ActionReducerMap<QuangAuthState> = {
  quangAuthUserState: QuangAuthReducers.quangAuthUserReducer
}
