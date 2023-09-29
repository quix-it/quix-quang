import { Action, createReducer, on } from '@ngrx/store'

import { Planet } from '../../planets/planet.model'

import { PlanetsActions } from '../actions'

export interface PlanetsState {
  list: Planet[]
  detail: Planet | null
}

const initialValue: PlanetsState = {
  list: [],
  detail: null
}

const reducer = createReducer(
  initialValue,
  on(PlanetsActions.getPlanetsSuccess, (state, action) => ({
    ...state,
    list: action.planets
  })),
  on(PlanetsActions.getPlanetsError, () => initialValue)
)

export function planetsReducer(state: PlanetsState | undefined, action: Action): any {
  return reducer(state, action)
}
