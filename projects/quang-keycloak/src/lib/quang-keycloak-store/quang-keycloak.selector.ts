import { createSelector } from '@ngrx/store'
import { selectQuangKeycloak } from '../quang-keycloak-module.selector'
import { QuangKeycloakState } from '../quang-keycloak-module.reducer'

export const selectIsAuthenticated = createSelector(selectQuangKeycloak,
  (state: QuangKeycloakState) => state.quangKeycloakUserState.isAuthenticated)
export const selectUserInfo = createSelector(selectQuangKeycloak,
  (state: QuangKeycloakState) => state.quangKeycloakUserState.user)
export const selectUserRoles = createSelector(selectQuangKeycloak,
  (state: QuangKeycloakState) => state.quangKeycloakUserState.roles)
export const selectHasRoles = createSelector(selectQuangKeycloak,
  (state: QuangKeycloakState, props: { rolesId: string[] }) => {
    let find = true
    props.rolesId.forEach(role => {
      find = find && !!state.quangKeycloakUserState.roles.find(ur => ur === role)
    })
    return find
  })
export const selectHasUntilRoles = createSelector(selectQuangKeycloak,
  (state: QuangKeycloakState, props: { rolesId: string[] }) => {
    let find = false
    props.rolesId.forEach(role => {
      find = find || !!state.quangKeycloakUserState.roles.find(ur => ur === role)
    })
    return find
  })
