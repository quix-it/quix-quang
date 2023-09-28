import { createSelector } from '@ngrx/store'

import { QuangDialogState } from '../../../dialog.reducer'
import { selectQuangDialog } from '../../../dialog.selectors'

/**
 * selector for offline store state
 */
export const selectLine = createSelector(
  selectQuangDialog,
  (state: QuangDialogState): boolean => state.offlineState?.line
)
