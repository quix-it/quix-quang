import { createFeatureSelector } from '@ngrx/store'
import { QuangAuthModuleState, QuangAuthState } from './quang-auth-module.reducer'

/**
 * the key that identifies the module store
 */
export const QUANGAUTH_KEY = 'quangAuth'
/**
 * module selector
 */
export const selectQuangAuth = createFeatureSelector<QuangAuthModuleState, QuangAuthState>(QUANGAUTH_KEY)
