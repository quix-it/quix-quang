import { createSelector } from '@ngrx/store'
import { selectQuangKeycloak } from '../../quang-keycloak-module.selector'
import { QuangKeycloakState } from '../../quang-keycloak-module.reducer'

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
