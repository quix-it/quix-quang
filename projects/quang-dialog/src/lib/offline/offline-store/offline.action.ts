import { createAction } from '@ngrx/store'

/**
 * set state offline
 */
export const offline = createAction('[LINE] offline')
/**
 * set state online
 */
export const online = createAction('[LINE] online')
