import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { PlanetsService } from '../../planets/planets.service'
import { PlanetsActions } from '../actions'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

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
