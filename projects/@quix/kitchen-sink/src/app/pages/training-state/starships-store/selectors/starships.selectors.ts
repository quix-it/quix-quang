import { MemoizedSelector, createSelector } from '@ngrx/store'

import { Starship } from '../../starships/starship.model'

import { selectAppModule } from '../../../../store/app.selectors'

import { AppState } from '../../../../store/app.reducer'
import { StarshipsState } from '../reducers/starships.reducers'

export const selectStarshipState = createSelector(
  selectAppModule,
  (state: AppState): StarshipsState => state.starshipsState
)
export const selectStarships = createSelector(selectStarshipState, (state: StarshipsState): Starship[] => state.list)
export const selectStarship = createSelector(
  selectStarshipState,
  (state: StarshipsState): Starship | null => state.detail
)

export function selectStarshipById(id: string): MemoizedSelector<AppState, Starship | undefined> {
  return createSelector(selectStarshipState, (state: StarshipsState): Starship | undefined =>
    state.list.find((s) => s.id === id)
  )
}

export function selectStarshipById2(id: string): MemoizedSelector<AppState, Starship | undefined> {
  return createSelector(selectStarships, (starships: Starship[]): Starship | undefined =>
    starships.find((s) => s.id === id)
  )
}
