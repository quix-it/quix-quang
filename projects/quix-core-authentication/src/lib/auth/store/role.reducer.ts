import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import * as RoleAction from './role.action';

export interface RoleState {
  roles: Array<string>;
}

export const roleInitialState: RoleState = {roles: []};
let reducer: ActionReducer<RoleState, Action>;
reducer = createReducer(
  roleInitialState,
  on(RoleAction.storeRoles, (state, action) => ({...state, roles: action.roleData})),
  on(RoleAction.cleanRoles, (state, action) => ({...state, roles: []})),
);

export function roleReducer(state: RoleState | undefined, action: Action) {
  return reducer(state, action);
}
