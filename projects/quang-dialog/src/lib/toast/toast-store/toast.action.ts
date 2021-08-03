import { createAction, props } from '@ngrx/store'
import { QuixToast } from '../toast.model'

/**
 * open toast
 */
export const openToast = createAction('[TOASTS API] open toast', props<{ toastData: QuixToast }>())
/**
 * delete toast
 */
export const deleteToast = createAction('[TOASTS API] delete toast')
