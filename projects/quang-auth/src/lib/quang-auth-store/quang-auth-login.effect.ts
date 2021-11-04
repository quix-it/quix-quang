/**
 * service decorator
 */
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { QuangAuthService } from '../quang-auth.service'
import { Store } from '@ngrx/store'
import { exhaustMap, map } from 'rxjs/operators'
import { userLogin } from './quang-auth.action'

@Injectable({
  providedIn: 'root'
})
export class QuangAuthLoginEffect {
  /**
   * Effect that is triggered when the store is initialized,
   * starts the login procedure,
   * if the user authenticates he dispatches the login action
   */
  startAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quangAuthService.login().pipe(
          map(is => {
            this.quangAuthService.startRefreshToken()
            return userLogin()
          })
        )
      )
    )
  )

  /**
   * constructor
   * @param actions$ actions access
   * @param quangAuthService auth utility
   * @param store store access
   */
  constructor (
    private readonly actions$: Actions,
    private readonly quangAuthService: QuangAuthService,
    private readonly store: Store<any>
  ) {
  }
}
