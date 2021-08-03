import { createSelector } from '@ngrx/store'
import { selectQuangAuth } from '../quang-auth-module.selector'
import { QuangAuthState } from '../quang-auth-module.reducer'

/**
 * Authentication status selector
 */
export const selectIsAuthenticated = createSelector(
  selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.isAuthenticated
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
 * Selector to define if the user has all the required roles
 */
export const selectHasRoles = createSelector(
  selectQuangAuth,
  (state: QuangAuthState, props: { rolesId: string[] }) => {
    let find = true
    props.rolesId.forEach(role => {
      find = find && !!state.quangAuthUserState.roles.find(ur => ur === role)
    })
    return find
  }
)
/**
 * Selector to define if the user has at least one required role
 */
export const selectHasUntilRoles = createSelector(
  selectQuangAuth,
  (state: QuangAuthState, props: { rolesId: string[] }) => {
    let find = false
    props.rolesId.forEach(role => {
      find = find || !!state.quangAuthUserState.roles.find(ur => ur === role)
    })
    return find
  }
)
