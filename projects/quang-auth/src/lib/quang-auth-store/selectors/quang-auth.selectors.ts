import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store'
import { selectQuangAuth } from '../../quang-auth-module.selector'
import { QuangAuthModuleState, QuangAuthState } from '../../quang-auth-module.reducer'

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

/**
 * Selector to check if the user has all the required roles
 */
export const selectHasRoles = (rolesId: string[]): MemoizedSelector<QuangAuthModuleState, boolean, DefaultProjectorFn<boolean>> =>
  createSelector(
    selectUserRoles,
    (userRoles: string[]) =>
      rolesId
        .map(r => userRoles.includes(r))
        .reduce((f, r) => f && r, true)
  )
/**
 * Selector to check if the user has at least one required role
 */
export const selectHasUntilRoles = (rolesId: string[]): MemoizedSelector<QuangAuthModuleState, boolean, DefaultProjectorFn<boolean>> =>
  createSelector(
    selectUserRoles,
    (userRoles: string[]) =>
      rolesId
        .map(r => userRoles.includes(r))
        .reduce((f, r) => f || r, false)
  )
