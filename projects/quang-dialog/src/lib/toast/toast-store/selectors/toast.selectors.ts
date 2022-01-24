import { createSelector } from '@ngrx/store'
import { QuangDialogState } from '../../../quang-dialog.reducers'
import { selectQuangDialog } from '../../../quang-dialog.selector'

/**
 * selector for toast state
 */
export const selectToast = createSelector(
  selectQuangDialog,
  (state: QuangDialogState) => state.toastState
)
