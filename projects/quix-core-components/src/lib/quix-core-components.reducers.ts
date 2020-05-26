import {toastReducer, ToastsState} from './toast/toasts-store/toasts.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {loaderReducer, LoaderState} from "./loader/loader-store/loader.reducer";

export const CORECOMPONENTS_KEY = 'quix-core-components';

export interface QuixCoreComponentsState {
  toastState: ToastsState;
  loaderState: LoaderState
}

export interface QuixCoreComponentsStateModule {
  [CORECOMPONENTS_KEY]: QuixCoreComponentsState;
}

export const quixCoreComponetsReducers: ActionReducerMap<QuixCoreComponentsState> = {
  toastState: toastReducer,
  loaderState:loaderReducer
};
