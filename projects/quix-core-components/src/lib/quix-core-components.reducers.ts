
import {ActionReducerMap} from '@ngrx/store';
import {loaderReducer, LoaderState} from "./loader/loader-store/loader.reducer";
import {toastReducer, ToastsState} from "./toast/toast-store/toast.reducer";
import {offlineReducer, OfflineState} from "./offline/offline-store/offline.reducer";

export const CORECOMPONENTS_KEY = 'quix-core-components';

export interface QuixCoreComponentsState {
  toastState: ToastsState;
  loaderState: LoaderState;
  offlineState: OfflineState
}

export interface QuixCoreComponentsStateModule {
  [CORECOMPONENTS_KEY]: QuixCoreComponentsState;
}

export const quixCoreComponetsReducers: ActionReducerMap<QuixCoreComponentsState> = {
  toastState: toastReducer,
  loaderState:loaderReducer,
  offlineState:offlineReducer
};
