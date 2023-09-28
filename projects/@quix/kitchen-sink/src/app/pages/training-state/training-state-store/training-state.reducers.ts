import { TRAINING_STATE_KEY } from './training-state.selector'
import { ActionReducerMap } from '@ngrx/store'
import {
  planetsReducer,
  PlanetsState
} from '../planets-store/reducers/planets.reducers'
import { AppState } from '../../../store/app.reducer'

export interface TrainingState {
  planetsState: PlanetsState
}

export interface TrainingStateModuleStore extends AppState {
  [TRAINING_STATE_KEY]: TrainingState
}

export const trainingStateReducers: ActionReducerMap<TrainingState> = {
  planetsState: planetsReducer
}
