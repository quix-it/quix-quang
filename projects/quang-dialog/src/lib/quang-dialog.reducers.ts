import { ActionReducerMap } from '@ngrx/store'
import { toastReducer, ToastsState } from './toast/toast-store/toast.reducer'
import { offlineReducer, OfflineState } from './offline/offline-store/offline.reducer'
import { loaderReducer, LoaderState } from './loader/loader-store/loader.reducer'

export const QUNAGDIALOG_KEY = 'quang-dialog-module'

export interface QuangDialogState {
  toastState: ToastsState;
  offlineState: OfflineState,
  loaderState: LoaderState
}

export interface QuangDialogStateModule {
  [QUNAGDIALOG_KEY]: QuangDialogState;
}

export const quangDialogReducers: ActionReducerMap<QuangDialogState> = {
  toastState: toastReducer,
  offlineState: offlineReducer,
  loaderState: loaderReducer
}
