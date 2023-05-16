import { ActionReducerMap } from '@ngrx/store'
import { QUANGKEYCLOAK_KEY } from './quang-keycloak-module.selector'
import { QuangKeycloakUserState } from './quang-keycloak-store/reducers/quang-keycloak.reducers'
import { QuangKeycloakReducers } from './quang-keycloak-store/reducers'

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
