import {createAction, props} from '@ngrx/store';


export const storeRoles = createAction('[ROLE SAVE] user loading success', props<{ roleData: Array<string> }>());
export const cleanRoles = createAction('[ROLE CLEAN] user lost role');
