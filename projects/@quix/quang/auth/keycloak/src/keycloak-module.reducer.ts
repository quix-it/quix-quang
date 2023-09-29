import { ActionReducerMap } from '@ngrx/store'

import { QUANGKEYCLOAK_KEY } from './keycloak-module.selectors'

import { QuangKeycloakReducers } from './store/reducers'
import { QuangKeycloakUserState } from './store/reducers/keycloak.reducer'

/**
 * interface that defines the state of the module
 */
export interface QuangKeycloakState {
  /**
   * auth state
   */
  quangKeycloakUserState: QuangKeycloakUserState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangKeycloakModuleState {
  /**
   * link key to state definition
   */
  [QUANGKEYCLOAK_KEY]: QuangKeycloakState
}

/**
 * definition of the reducer map
 */
export const quangKeycloakReducer: ActionReducerMap<QuangKeycloakState> = {
  quangKeycloakUserState: QuangKeycloakReducers.quangKeycloakUserReducer
}
