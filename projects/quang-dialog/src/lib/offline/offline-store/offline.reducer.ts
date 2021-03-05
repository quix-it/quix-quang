import { Action, createReducer, on } from '@ngrx/store'
import { offline, online } from './offline.action'

export interface OfflineState {
  line: boolean
}

const initialState: OfflineState = {
  line: true
}
const reducer = createReducer(
  initialState,
  on(online, state => ({ ...state, line: true })),
  on(offline, state => ({ ...state, line: false })),
)

export function offlineReducer (state: OfflineState | undefined, action: Action) {
  return reducer(state, action)
}
