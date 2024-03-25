import { MemoizedSelector, createSelector } from '@ngrx/store'

import { Planet } from '../../planets/planet.model'

import { TrainingState, TrainingStateModuleStore } from '../../training-state-store/training-state.reducers'
import { selectTrainingState } from '../../training-state-store/training-state.selector'
import { PlanetsState } from '../reducers/planets.reducers'

export const selectPlanetState = createSelector(
  selectTrainingState,
  (state: TrainingState): PlanetsState => state.planetsState
)
export const selectPlanets = createSelector(selectPlanetState, (state: PlanetsState): Planet[] => state.list)
export const selectPlanet = createSelector(selectPlanetState, (state: PlanetsState): Planet | null => state.detail)

export function selectPlanetById(id: string): MemoizedSelector<TrainingStateModuleStore, Planet | undefined> {
  return createSelector(selectPlanetState, (state: PlanetsState): Planet | undefined =>
    state.list.find((p) => p.id === id)
  )
}
