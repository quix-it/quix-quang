import { ActionReducerMap } from '@ngrx/store'

import { StarshipsState, starshipsReducer } from '../pages/training-state/starships-store/reducers/starships.reducers'

export interface AppState {
  starshipsState: StarshipsState
}

export const appReducers: ActionReducerMap<AppState> = {
  starshipsState: starshipsReducer
}
