import { ActionReducerMap } from '@ngrx/store'

import { AppState } from '../../../store/app.reducer'
import { PlanetsState, planetsReducer } from '../planets-store/reducers/planets.reducers'
import { TRAINING_STATE_KEY } from './training-state.selector'

export interface TrainingState {
  planetsState: PlanetsState
}

export interface TrainingStateModuleStore extends AppState {
  [TRAINING_STATE_KEY]: TrainingState
}

export const trainingStateReducers: ActionReducerMap<TrainingState> = {
  planetsState: planetsReducer
}
