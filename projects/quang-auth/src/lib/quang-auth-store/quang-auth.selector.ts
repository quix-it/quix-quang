import {createSelector} from "@ngrx/store";
import { selectQuangAuth } from '../quang-auth-module.selector'
import { QuangAuthState } from '../quang-auth-module.reducer'


export const selectIsAuthenticated = createSelector(selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.isAuthenticated)
export const selectUserInfo = createSelector(selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.user)
export const selectUserRoles = createSelector(selectQuangAuth,
  (state: QuangAuthState) => state.quangAuthUserState.roles)
export const selectHasRoles = createSelector(selectQuangAuth,
  (state: QuangAuthState, props: { rolesId: string[] }) => {
    let find = true
    props.rolesId.forEach(role => {
      find = find && !!state.quangAuthUserState.roles.find(ur => ur === role)
    })
    return find
  });
export const selectHasUntilRoles = createSelector(selectQuangAuth,
  (state: QuangAuthState, props: { rolesId: string[] }) => {
    let find = false
    props.rolesId.forEach(role => {
      find = find || !!state.quangAuthUserState.roles.find(ur => ur === role)
    })
    return find
  });
