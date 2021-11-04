import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { exhaustMap, map } from 'rxjs/operators'
import { userInfoLogout, userLogin, userRolesLogout } from './quang-auth.action'
import { QuangAuthService } from '../quang-auth.service'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root'
})
export class QuangAuthTryLoginEffect {
  /**
   * Effect that is triggered when the store is initialized,
   *
   */
  tryStartAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quangAuthService.tryLogin().pipe(
          map(is => {
            if (is && this.quangAuthService.isAuthenticated()) {
              this.quangAuthService.startRefreshToken()
              this.store.dispatch(userLogin())
            } else {
              this.store.dispatch(userRolesLogout())
              this.store.dispatch(userInfoLogout())
            }
          })
        )
      )
    ), {dispatch: false}
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
