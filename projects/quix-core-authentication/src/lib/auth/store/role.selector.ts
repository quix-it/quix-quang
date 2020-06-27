import {createSelector} from '@ngrx/store';
import {quixCoreAuthenticationSelector} from '../../quix-core-authentication.selector';
import {QuixCoreAuthenticationState} from '../../quix-core-authentication.reducers';


export const selectRoles = createSelector(quixCoreAuthenticationSelector, (state: QuixCoreAuthenticationState) => state.roleState);
export const haveRole = createSelector(
  quixCoreAuthenticationSelector,
  (state: QuixCoreAuthenticationState, proops: { roleId: string }) =>
    state.roleState.roles.includes(proops.roleId));
export const haveRoles = createSelector(
  quixCoreAuthenticationSelector,
  (state: QuixCoreAuthenticationState, proops: { roleIds: Array<string> }) => {
    let hasAllRole = true;
    proops.roleIds.forEach((roleId: string) => {
      hasAllRole = hasAllRole && state.roleState.roles.includes(roleId);
    });
    return hasAllRole;
  });
