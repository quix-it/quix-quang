import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { exhaustMap, map } from 'rxjs/operators'
import { QuangAuthService } from '../../quang-auth.service'
import { Store } from '@ngrx/store'
import { QuangAuthActions } from '../actions'

@Injectable({
  providedIn: 'root'
})
export class QuangAuthTryLoginEffects {
  /**
   * Effect that is triggered when the store is initialized,
   */
  tryStartAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quangAuthService.tryLogin().pipe(
          map(is => {
            if (is && this.quangAuthService.isAuthenticated()) {
              this.quangAuthService.startRefreshToken()
              this.store.dispatch(QuangAuthActions.userLogin())
            } else {
              this.store.dispatch(QuangAuthActions.userRolesLogout())
              this.store.dispatch(QuangAuthActions.userInfoLogout())
            }
          })
        )
      )
    ), { dispatch: false }
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
