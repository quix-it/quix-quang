import { ActionReducerMap } from '@ngrx/store'
import { QUANGKEYCLOAK_KEY } from './quang-keycloak-module.selector'
import { quangKeycloakUserReducer, QuangKeycloakUserState } from './quang-keycloak-store/quang-keycloak.reducer'

/**
 * interface that defines the state of the module
 */
export interface QuangKeycloakState {
  quangKeycloakUserState: QuangKeycloakUserState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangkeycloakModuleState {
  [QUANGKEYCLOAK_KEY]: QuangKeycloakState
}

/**
 * definition of the reducer map
 */
export const quangkeycloakReducer: ActionReducerMap<QuangKeycloakState> = {
  quangKeycloakUserState: quangKeycloakUserReducer
}
