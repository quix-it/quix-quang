import {createAction, props} from '@ngrx/store';


export const userLogin = createAction('[USER LOGIN] user authenticated', props<{ userData: any }>());
export const userLogout = createAction('[USER LOGOUT] user go home');
