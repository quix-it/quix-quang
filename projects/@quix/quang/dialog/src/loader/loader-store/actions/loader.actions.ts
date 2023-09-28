import { createAction } from '@ngrx/store'

/**
 * add loader call to counter
 */
export const addLoader = createAction('[LOADER] request start')
/**
 * remove loader call to counter
 */
export const removeLoader = createAction('[LOADER] response return')
