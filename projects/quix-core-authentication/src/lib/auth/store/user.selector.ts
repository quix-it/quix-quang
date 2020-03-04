import {createSelector} from '@ngrx/store';


export const userSelector = (state) => state.userState;
export const SelectUser = createSelector(userSelector, (state) => state.user);
