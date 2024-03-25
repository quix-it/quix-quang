import { createFeatureSelector } from '@ngrx/store'

import { TrainingState, TrainingStateModuleStore } from './training-state.reducers'

export const TRAINING_STATE_KEY = 'training-state'

export const selectTrainingState = createFeatureSelector<TrainingStateModuleStore, TrainingState>(TRAINING_STATE_KEY)
