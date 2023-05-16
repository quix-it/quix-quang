import { createSelector } from '@ngrx/store'
import { QuangDialogState } from '../../../quang-dialog.reducers'
import { selectQuangDialog } from '../../../quang-dialog.selector'
import { QuangToast } from '../../toast.model'
import { ToastsState } from '../reducers/toast.reducers'

/**
 * selector for toast state
 */
export const selectToastState = createSelector(
  selectQuangDialog,
  (state: QuangDialogState): ToastsState => state.toastState
)
/**
 * selector for toast state
 */
export const selectToast = createSelector(
  selectQuangDialog,
  (state: QuangDialogState): QuangToast => state.toastState?.toastData
)
