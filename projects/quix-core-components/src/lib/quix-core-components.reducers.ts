import {toastReducer, ToastsState} from './toast/toasts-store/toasts.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const CORECOMPONENTS_KEY = 'quix-core-components';

export interface QuixCoreComponentsState {
  toastState: ToastsState;
}

export interface QuixCoreComponentsStateModule {
  [CORECOMPONENTS_KEY]: QuixCoreComponentsState;
}

export const quixCoreComponetsReducers: ActionReducerMap<QuixCoreComponentsState> = {
  toastState: toastReducer
};
