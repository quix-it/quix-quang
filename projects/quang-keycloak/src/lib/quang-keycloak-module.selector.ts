import { createFeatureSelector } from '@ngrx/store'
import { QuangkeycloakModuleState, QuangKeycloakState } from './quang-keycloak-module.reducer'

/**
 * the key that identifies the module store
 */
export const QUANGKEYCLOAK_KEY = 'quang-keycloak-module'
/**
 * module selector
 */
export const selectQuangKeycloak = createFeatureSelector<QuangkeycloakModuleState, QuangKeycloakState>(QUANGKEYCLOAK_KEY)
