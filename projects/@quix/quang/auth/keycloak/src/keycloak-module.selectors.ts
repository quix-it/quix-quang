import { createFeatureSelector } from '@ngrx/store'
import { QuangKeycloakModuleState, QuangKeycloakState } from './keycloak-module.reducer'

/**
 * the key that identifies the module store
 */
export const QUANGKEYCLOAK_KEY = 'quang-keycloak-module'
/**
 * module selector
 */
export const selectQuangKeycloak = createFeatureSelector<QuangKeycloakModuleState, QuangKeycloakState>(QUANGKEYCLOAK_KEY)
