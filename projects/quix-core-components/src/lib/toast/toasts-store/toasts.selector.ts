import {createSelector} from '@ngrx/store';
import {quixCoreComponentsSelector} from '../../quix-core-components.selector';
import {QuixCoreComponentsState} from '../../quix-core-components.reducers';

export const toastStateSelector = createSelector(quixCoreComponentsSelector, (state: QuixCoreComponentsState) => state.toastState);
