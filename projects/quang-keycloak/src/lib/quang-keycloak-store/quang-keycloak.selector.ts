import { createSelector } from '@ngrx/store'
import { selectQuangKeycloak } from '../quang-keycloak-module.selector'
import { QuangKeycloakState } from '../quang-keycloak-module.reducer'

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
export const selectHasRoles = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState, props: { rolesId: string[] }) => {
    let find = true
    props.rolesId.forEach(role => {
      find = find && !!state?.quangKeycloakUserState?.roles.includes(role)
    })
    return find
  }
)
/**
 * Selector to check if the user has at least one required role
 */
export const selectHasUntilRoles = createSelector(
  selectQuangKeycloak,
  (state: QuangKeycloakState, props: { rolesId: string[] }) => {
    let find = false
    props.rolesId.forEach(role => {
      find = find || !!state?.quangKeycloakUserState?.roles.includes(role)
    })
    return find
  }
)
