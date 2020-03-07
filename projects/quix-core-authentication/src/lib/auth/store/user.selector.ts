import {createSelector} from '@ngrx/store';
import {selectAuthState} from '../quix-auth.selector';
import {QuixAuthState} from '../quix-auth.reducers';

export const selectUser = createSelector(selectAuthState, (state: QuixAuthState) => state.userState.user);
