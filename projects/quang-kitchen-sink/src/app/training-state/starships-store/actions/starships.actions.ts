import { createAction, props } from '@ngrx/store'
import { Starship } from '../../starships/starship.model'

enum Actions {
  GET_STARSHIPS = '[STARSHIPS] get starships'
}

export const getStarships = createAction(Actions.GET_STARSHIPS)
export const getStarshipsSuccess = createAction(
  '[STARSHIPS] get starships success',
  props<{ starships: Starship[] }>()
)
export const getStarshipsError = createAction(
  '[STARSHIPS] get starships error',
  props<{ error: any }>()
)
export const getStarship = createAction(
  '[STARSHIPS] get starship',
  props<{ id: string }>()
)
export const getStarshipSuccess = createAction(
  '[STARSHIPS] get starship success',
  props<{ starship: Starship }>()
)
export const getStarshipError = createAction(
  '[STARSHIPS] get starship error',
  props<{ error: any }>()
)
