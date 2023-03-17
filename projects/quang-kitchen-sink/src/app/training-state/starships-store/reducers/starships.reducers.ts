import { Starship } from '../../starships/starship.model'
import { Action, createReducer, on } from '@ngrx/store'
import { StarshipsActions } from '../actions'

export interface StarshipsState {
  list: Starship[]
  detail: Starship | null
}

const initialValue: StarshipsState = {
  list: [],
  detail: null
}

const reducer = createReducer(
  initialValue,
  on(StarshipsActions.getStarshipsSuccess, (state, action) => ({
    ...state,
    list: action.starships
  })),
  on(StarshipsActions.getStarshipsError, () => initialValue)
)

export function starshipsReducer(
  state: StarshipsState | undefined,
  action: Action
): any {
  return reducer(state, action)
}
