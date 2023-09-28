import { ActionReducerMap } from '@ngrx/store'
import { ToastsState } from './toast/toast-store/reducers/toast.reducers'
import { OfflineState } from './offline/offline-store/reducers/offline.reducer'
import { LoaderState } from './loader/loader-store/reducers/loader.reducers'
import { QUANGDIALOG_KEY } from './quang-dialog.selector'
import { ToastReducers } from './toast/toast-store/reducers'
import { OfflineReducers } from './offline/offline-store/reducers'
import { LoaderReducers } from './loader/loader-store/reducers'

/**
 * interface that defines the state of the module
 */
export interface QuangDialogState {
  /**
   * toast state
   */
  toastState: ToastsState
  /**
   * offline state
   */
  offlineState: OfflineState
  /**
   * loader state
   */
  loaderState: LoaderState
}

/**
 * connection interface with the key for connection to the general state of the application
 */
export interface QuangDialogStateModule {
  /**
   * link key to state definition
   */
  [QUANGDIALOG_KEY]: QuangDialogState
}

/**
 * definition of the reducer map
 */
export const quangDialogReducers: ActionReducerMap<QuangDialogState> = {
  toastState: ToastReducers.toastReducers,
  offlineState: OfflineReducers.offlineReducer,
  loaderState: LoaderReducers.loaderReducers
}
