import { Action, createReducer, on } from '@ngrx/store'
import { offline, online } from './offline.action'

/**
 * define offline state
 */
export interface OfflineState {
  /**
   * define line state
   */
  line: boolean
}

/**
 * initial offline state value
 */
const initialState: OfflineState = {
  line: true
}
/**
 * define how the state change
 */
const reducer = createReducer(
  initialState,
  on(online, state => ({ ...state, line: true })),
  on(offline, state => ({ ...state, line: false }))
)

/**
 * define state name
 * @param state
 * @param action
 */
export function offlineReducer (state: OfflineState | undefined, action: Action): any {
  return reducer(state, action)
}
