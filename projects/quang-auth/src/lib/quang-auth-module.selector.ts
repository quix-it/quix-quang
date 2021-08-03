import {createFeatureSelector} from "@ngrx/store";

/**
 * the key that identifies the module store
 */
export const QUANGAUTH_KEY = 'quangAuth'
/**
 * module selector
 */
export const selectQuangAuth = createFeatureSelector(QUANGAUTH_KEY)
