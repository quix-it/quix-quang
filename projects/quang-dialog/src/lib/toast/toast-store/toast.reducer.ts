import { Action, createReducer, on } from '@ngrx/store'
import { deleteToast, openToast } from './toast.action'
import { QuixToast } from '../toast.model'

/**
 * define toast state in store
 */
export interface ToastsState {
  /**
   * toast data
   */
  toastData: QuixToast
}

/**
 * initial value of toast state
 */
export const initialState: ToastsState = { toastData: null }
/**
 * defines how the status of the toast changes in the store
 */
const reducer = createReducer(
  initialState,
  on(openToast, (state, action) =>
    ({ ...state, toastData: action.toastData })
  ),
  on(deleteToast, (state) =>
    ({ ...state, toastData: null })
  )
)

/**
 * define reducer name
 * @param state
 * @param action
 */
export function toastReducer (state: ToastsState | undefined, action: Action): any {
  return reducer(state, action)
}
