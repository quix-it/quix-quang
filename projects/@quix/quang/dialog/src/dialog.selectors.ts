import { createFeatureSelector } from '@ngrx/store'

import { QuangDialogState, QuangDialogStateModule } from './dialog.reducer'

/**
 * the key that identifies the module store
 */
export const QUANGDIALOG_KEY = 'quang-dialog-module'
/**
 * module selector
 */
export const selectQuangDialog = createFeatureSelector<QuangDialogStateModule, QuangDialogState>(QUANGDIALOG_KEY)
