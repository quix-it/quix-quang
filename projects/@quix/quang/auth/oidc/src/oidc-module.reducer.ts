import { ActionReducerMap } from '@ngrx/store'

import { QUANGOIDC_KEY } from './oidc-module.selectors'

import { QuangAuthReducers } from './store/reducers'
import { QuangAuthUserState } from './store/reducers/oidc.reducer'

export interface QuangOpenIdConnectState {
  quangAuthUserState: QuangAuthUserState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangOpenIdConnectModuleState {
  /**
   * link key to state definition
   */
  [QUANGOIDC_KEY]: QuangOpenIdConnectState
}

/**
 * definition of the reducer map
 */
export const quangAuthReducer: ActionReducerMap<QuangOpenIdConnectState> = {
  quangAuthUserState: QuangAuthReducers.quangAuthUserReducer
}
