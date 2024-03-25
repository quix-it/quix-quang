import { Injectable } from '@angular/core'

import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { PlanetsService } from '../../planets/planets.service'

import { PlanetsActions } from '../actions'

import { Actions, createEffect, ofType } from '@ngrx/effects'

@Injectable()
export class PlanetsEffects {
  constructor(
    private readonly actions: Actions,
    private readonly planetsService: PlanetsService
  ) {}

  getPlanets = createEffect(() =>
    this.actions.pipe(
      ofType(PlanetsActions.getPlanets),
      mergeMap(() =>
        this.planetsService.getPlanets().pipe(
          map((r) => PlanetsActions.getPlanetsSuccess({ planets: r })),
          catchError((error) => of(PlanetsActions.getPlanetsError({ error })))
        )
      )
    )
  )
}
