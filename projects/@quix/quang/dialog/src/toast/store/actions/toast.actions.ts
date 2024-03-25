import { createAction, props } from '@ngrx/store'

import { QuangToast } from '../../toast.model'

/**
 * open toast
 */
export const openToast = createAction('[TOASTS API] open toast', props<{ toastData: QuangToast }>())
/**
 * delete toast
 */
export const deleteToast = createAction('[TOASTS API] delete toast')
