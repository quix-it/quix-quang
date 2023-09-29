import { createSelector } from '@ngrx/store'

import { QuangKeycloakState } from '../../keycloak-module.reducer'
import { selectQuangKeycloak } from '../../keycloak-module.selectors'

/**
 * Selector to retrieve the status of user authentication
 */
export const selectIsAuthenticated = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState): boolean => state?.quangKeycloakUserState?.isAuthenticated
)
/**
 * Selector to retrieve the status of the user data
 */
export const selectUserInfo = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState): any => state?.quangKeycloakUserState?.user
)
/**
 * Selector to retrieve the status of the role list
 */
export const selectUserRoles = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState): any[] => state?.quangKeycloakUserState?.roles
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
