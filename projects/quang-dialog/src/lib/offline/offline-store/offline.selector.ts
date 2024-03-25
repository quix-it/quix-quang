import { createSelector } from '@ngrx/store'
import { selectQuangDialog } from '../../quang-dialog.selector'
import { QuangDialogState } from '../../quang-dialog.reducers'

/**
 * selector for offline store state
 */
export const selectLine = createSelector(
  selectQuangDialog,
  (state: QuangDialogState) => state.offlineState?.line
)
