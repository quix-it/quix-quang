import { Action, createReducer, on } from '@ngrx/store'

import { addLoader, removeLoader } from '../actions/loader.actions'

/**
 * define loader state
 */
export interface QuangLoaderState {
  /**
   * loaders number
   */
  loaders: number
}

/**
 * loader state initial value
 */
const initialState: QuangLoaderState = {
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
export function loaderReducer(state: QuangLoaderState | undefined, action: Action): any {
  return reducer(state, action)
}
