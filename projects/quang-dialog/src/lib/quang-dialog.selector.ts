import { createFeatureSelector } from '@ngrx/store'
/**
 * the key that identifies the module store
 */
export const QUANGDIALOG_KEY = 'quang-dialog-module'
/**
 * module selector
 */
export const selectQuangDialog = createFeatureSelector(QUANGDIALOG_KEY)
