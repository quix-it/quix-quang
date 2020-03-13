import {createSelector} from '@ngrx/store';
import {quixCoreAuthenticationSelector} from '../../quix-core-authentication.selector';
import {QuixCoreAuthenticationState} from '../../quix-core-authentication.reducers';

export const selectUser = createSelector(quixCoreAuthenticationSelector, (state: QuixCoreAuthenticationState) => state.userState.user);
