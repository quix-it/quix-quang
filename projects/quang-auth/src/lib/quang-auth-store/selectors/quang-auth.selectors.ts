import { createSelector } from '@ngrx/store'
import { selectQuangAuth } from '../../quang-auth-module.selector'
import { QuangAuthState } from '../../quang-auth-module.reducer'

/**
 * Authentication status selector
 */
export const selectIsAuthenticated = createSelector(
  selectQuangAuth,
  (state: QuangAuthState): boolean => state.quangAuthUserState.isAuthenticated
)
/**
 * User info status selector
 */
export const selectUserInfo = createSelector(
  selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.user
)
/**
 * User role status selector
 */
export const selectUserRoles = createSelector(
  selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.roles
)
