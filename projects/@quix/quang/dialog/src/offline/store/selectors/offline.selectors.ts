import { createSelector } from '@ngrx/store'

import { selectQuangDialog } from '../../../dialog.selectors'

import { QuangDialogState } from '../../../dialog.reducer'

/**
 * selector for offline store state
 */
export const selectLine = createSelector(
  selectQuangDialog,
  (state: QuangDialogState): boolean => state.offlineState?.line
)
