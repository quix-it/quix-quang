import { Action, createReducer, on } from '@ngrx/store'
import { addLoader, removeLoader } from './loader.action'

/**
 * define loader state
 */
export interface LoaderState {
  /**
   * loaders number
   */
  loaders: number
}

/**
 * loader state initial value
 */
const initialState: LoaderState = {
  loaders: 0
}
/**
 * define how loader state change
 */
const reducer = createReducer(
  initialState,
  on(addLoader, (state) => ({ ...state, loaders: state.loaders + 1 })),
  on(removeLoader, (state) => ({ ...state, loaders: state.loaders - 1 }))
)

/**
 * define loader name
 * @param state
 * @param action
 */
export function loaderReducer (state: LoaderState | undefined, action: Action): any {
  return reducer(state, action)
}
