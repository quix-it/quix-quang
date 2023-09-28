import { createSelector, DefaultProjectorFn, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store'
import { selectQuangKeycloak } from '../../keycloak-module.selectors'
import { QuangKeycloakModuleState, QuangKeycloakState } from '../../keycloak-module.reducer'

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
export const selectHasRoles = (rolesId: string[]): any =>
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
export const selectHasUntilRoles = (rolesId: string[]): any =>
  createSelector(
    selectUserRoles,
    (userRoles: string[]) =>
      rolesId
        .map(r => userRoles.includes(r))
        .reduce((f, r) => f || r, false)
  )
