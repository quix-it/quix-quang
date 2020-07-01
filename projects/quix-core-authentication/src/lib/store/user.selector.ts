import {createSelector} from '@ngrx/store';
import {quixAuthSelector} from "../quix-auth.selector";
import {QuixAuthState} from "../quix-auth.reducers";


export const selectInfoUser = createSelector(quixAuthSelector,
  (state: QuixAuthState) => state.userState?.user);
export const selectLogged = createSelector(quixAuthSelector,
  (state: QuixAuthState) => state.userState?.isLogged);
export const selectRoles = createSelector(quixAuthSelector,
  (state: QuixAuthState) => state.userState?.user?.realm_access.roles);
export const selectHasRoles = createSelector(quixAuthSelector,
  (state: QuixAuthState, props: { rolesId: string[] }) => {
    let find = true
    props.rolesId.forEach(role => {
      find = find && !!state.userState.user?.realm_access.roles.find(ur => ur === role)
    })
    return find
  });
export const selectHasUntilRoles = createSelector(quixAuthSelector,
  (state: QuixAuthState, props: { rolesId: string[] }) => {
    let find = false
    props.rolesId.forEach(role => {
      find = find || !!state.userState.user?.realm_access.roles.find(ur => ur === role)
    })
    return find
  });

