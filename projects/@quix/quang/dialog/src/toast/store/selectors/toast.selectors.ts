import { createSelector } from '@ngrx/store'

import { QuangToast } from '../../toast.model'

import { selectQuangDialog } from '../../../dialog.selectors'

import { QuangDialogState } from '../../../dialog.reducer'
import { ToastsState } from '../reducers/toast.reducer'

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
  (state: QuangDialogState): QuangToast | null => state.toastState?.toastData
)
