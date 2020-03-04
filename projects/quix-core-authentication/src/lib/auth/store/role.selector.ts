import {createSelector} from '@ngrx/store';
import {RoleState} from './role.reducer';


export const roleSelector = (state) => state.roleState;
export const selectRoles = createSelector(roleSelector, (state: RoleState) => state.roles);
export const haveRole = createSelector(
  roleSelector,
  (state: RoleState, proops) => state.roles.indexOf(proops.role) > 0);
