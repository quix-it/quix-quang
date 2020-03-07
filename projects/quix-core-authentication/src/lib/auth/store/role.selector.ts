import {createSelector} from '@ngrx/store';
import {RoleState} from './role.reducer';
import {selectAuthState} from '../quix-auth.selector';
import {QuixAuthState} from '../quix-auth.reducers';

export const selectRoles = createSelector(selectAuthState, (state: QuixAuthState) => state.roleState);
export const haveRole = createSelector(
  selectAuthState,
  (state: QuixAuthState, proops: { roleId: string }) => state.roleState.roles.includes(proops.roleId));
export const haveRoles = createSelector(
  selectAuthState,
  (state: QuixAuthState, proops: { roleIds: Array<string> }) => {
    let hasAllRole = true;
    proops.roleIds.forEach((roleId: string) => {
      hasAllRole = hasAllRole && state.roleState.roles.includes(roleId);
    });
    return hasAllRole;
  });
