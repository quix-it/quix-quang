import { createFeatureSelector } from '@ngrx/store'

/**
 * the key that identifies the module store
 */
export const QUANGKEYCLOAK_KEY = 'quangkeycloak'
/**
 * module selector
 */
export const selectQuangKeycloak = createFeatureSelector(QUANGKEYCLOAK_KEY)
