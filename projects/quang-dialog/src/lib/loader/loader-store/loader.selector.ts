import {createSelector} from "@ngrx/store";
import { selectQuangDialog } from '../../quang-dialog.selector'
import { QuangDialogState } from '../../quang-dialog.reducers'


export const selectLoader = createSelector(
  selectQuangDialog,
  (state:QuangDialogState)=>state.loaderState?.loaders)
