import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store'
import { selectQuangKeycloak } from '../../quang-keycloak-module.selector'
import { QuangKeycloakModuleState, QuangKeycloakState } from '../../quang-keycloak-module.reducer'

/**
 * Selector to retrieve the status of user authentication
 */
export const selectIsAuthenticated = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState) => state?.quangKeycloakUserState?.isAuthenticated
)
/**
 * Selector to retrieve the status of the user data
 */
export const selectUserInfo = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState) => state?.quangKeycloakUserState?.user
)
/**
 * Selector to retrieve the status of the role list
 */
export const selectUserRoles = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState) => state?.quangKeycloakUserState?.roles
)
/**
 * Selector to check if the user has all the required roles
 */
export const selectHasRoles = (rolesId: string[]): MemoizedSelector<QuangKeycloakModuleState, boolean, DefaultProjectorFn<boolean>> =>
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
export const selectHasUntilRoles = (rolesId: string[]): MemoizedSelector<QuangKeycloakModuleState, boolean, DefaultProjectorFn<boolean>> =>
  createSelector(
    selectUserRoles,
    (userRoles: string[]) =>
      rolesId
        .map(r => userRoles.includes(r))
        .reduce((f, r) => f || r, false)
  )
