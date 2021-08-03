import { QUANGAUTH_KEY } from './quang-auth-module.selector'
import { ActionReducerMap } from '@ngrx/store'
import { quangAuthUserReducer, QuangAuthUserState } from './quang-auth-store/quang-auth.reducer'

/**
 * interface that defines the state of the module
 */
export interface QuangAuthState {
  quangAuthUserState: QuangAuthUserState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangAuthModuleState {
  [QUANGAUTH_KEY]: QuangAuthState
}

/**
 * definition of the reducer map
 */
export const quangAuthReducer: ActionReducerMap<QuangAuthState> = {
  quangAuthUserState: quangAuthUserReducer
}
