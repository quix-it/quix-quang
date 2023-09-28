import { createSelector } from '@ngrx/store'
import { selectQuangDialog } from '../../../dialog.selectors'
import { QuangDialogState } from '../../../dialog.reducer'

/**
 * selector for loader state
 */
export const selectLoader = createSelector(
  selectQuangDialog,
  (state: QuangDialogState): number => state.loaderState?.loaders
)
