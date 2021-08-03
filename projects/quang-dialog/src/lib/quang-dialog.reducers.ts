import { ActionReducerMap } from '@ngrx/store'
import { toastReducer, ToastsState } from './toast/toast-store/toast.reducer'
import { offlineReducer, OfflineState } from './offline/offline-store/offline.reducer'
import { loaderReducer, LoaderState } from './loader/loader-store/loader.reducer'
import { QUANGDIALOG_KEY } from './quang-dialog.selector'

/**
 * interface that defines the state of the module
 */
export interface QuangDialogState {
  /**
   * toast state
   */
  toastState: ToastsState,
  /**
   * offline state
   */
  offlineState: OfflineState,
  /**
   * loader state
   */
  loaderState: LoaderState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangDialogStateModule {
  [QUANGDIALOG_KEY]: QuangDialogState;
}

/**
 * definition of the reducer map
 */
export const quangDialogReducers: ActionReducerMap<QuangDialogState> = {
  toastState: toastReducer,
  offlineState: offlineReducer,
  loaderState: loaderReducer
}
