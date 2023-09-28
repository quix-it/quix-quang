import { createAction, props } from '@ngrx/store'
import { Planet } from '../../planets/planet.model'

export const getPlanets = createAction('[PLANETS] get planets')
export const getPlanetsSuccess = createAction(
  '[PLANETS] get planets success',
  props<{ planets: Planet[] }>()
)
export const getPlanetsError = createAction(
  '[PLANETS] get planets error',
  props<{ error: any }>()
)
