import { createSelector } from '@ngrx/store'

import { QuangOpenIdConnectState } from '../../oidc-module.reducer'
import { selectQuangOpenIdConnect } from '../../oidc-module.selectors'

/**
 * Authentication status selector
 */
export const selectIsAuthenticated = createSelector(
  selectQuangOpenIdConnect,
  (state: QuangOpenIdConnectState): boolean => state.quangAuthUserState.isAuthenticated
)

/**
 * User info status selector
 */
export const selectUserInfo = createSelector(
  selectQuangOpenIdConnect,
  (state: QuangOpenIdConnectState): any => state.quangAuthUserState.user
)

/**
 * User role status selector
 */
export const selectUserRoles = createSelector(
  selectQuangOpenIdConnect,
  (state: QuangOpenIdConnectState): any[] => state.quangAuthUserState.roles
)

/**
 * Selector to check if the user has all the required roles
 */
export const selectHasEveryRole = (rolesToCheck: string[]): any =>
  createSelector(selectUserRoles, (userRoles: string[]): boolean =>
    rolesToCheck.every((roleToCheck) => userRoles.includes(roleToCheck))
  )

/**
 * Selector to check if the user has at least one required role
 */
export const selectHasAtLeastOneRole = (rolesToCheck: string[]): any =>
  createSelector(selectUserRoles, (userRoles: string[]): boolean =>
    rolesToCheck.some((roleToCheck) => userRoles.includes(roleToCheck))
  )
