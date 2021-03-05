import { createFeatureSelector } from '@ngrx/store'
import { QUNAGDIALOG_KEY } from './quang-dialog.reducers'

export const selectQuangDialog = createFeatureSelector(QUNAGDIALOG_KEY)
