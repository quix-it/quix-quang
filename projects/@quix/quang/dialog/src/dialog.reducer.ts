import { ActionReducerMap } from '@ngrx/store'

import { QUANGDIALOG_KEY } from './dialog.selectors'

import { LoaderReducers } from './loader/store/reducers'
import { QuangLoaderState } from './loader/store/reducers/loader.reducer'
import { OfflineReducers } from './offline/store/reducers'
import { OfflineState } from './offline/store/reducers/offline.reducer'
import { ToastReducers } from './toast/store/reducers'
import { ToastsState } from './toast/store/reducers/toast.reducer'

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
  loaderState: QuangLoaderState
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
  loaderState: LoaderReducers.loaderReducer
}
