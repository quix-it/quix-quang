import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { StarshipsActions } from '../actions'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { StarshipsService } from '../../starships/starships.service'
import { of } from 'rxjs'

@Injectable()
export class StarshipsEffects {
  constructor (
    private readonly actions: Actions,
    private readonly starshipsService: StarshipsService
  ) {}

  getStarships = createEffect(() =>
    this.actions.pipe(
      ofType(StarshipsActions.getStarships),
      mergeMap(() =>
        this.starshipsService.getStarships().pipe(
          map((r) => StarshipsActions.getStarshipsSuccess({ starships: r })),
          catchError((error) =>
            of(StarshipsActions.getStarshipsError({ error }))
          )
        )
      )
    )
  )

  getStarship = createEffect(() =>
    this.actions.pipe(
      ofType(StarshipsActions.getStarship),
      mergeMap((action) =>
        this.starshipsService.getStarship(action.id).pipe(
          map((r) => StarshipsActions.getStarshipSuccess({ starship: r })),
          catchError((error) =>
            of(StarshipsActions.getStarshipError({ error }))
          )
        )
      )
    )
  )
}
