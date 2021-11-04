import { Injectable } from '@angular/core'
import { QuangAuthService } from '../quang-auth.service'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { exhaustMap, map } from 'rxjs/operators'
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogout
} from './quang-auth.action'
import { Store } from '@ngrx/store'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
export class QuangAuthEffect {

  /**
   * Effect that is triggered when the effective login is dispatched, it recovers user data
   */
  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(action =>
        this.quangAuthService.getUserInfo().pipe(
          map((user: any) => {
            return userInfoLogin({ user: user })
          })
        )
      )
    )
  )

  /**
   * Effect that is triggered when the actual logout is dispatched,
   * deletes user data and starts the logout procedure
   */
  deleteUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogout),
      map(action => {
        this.store.dispatch(userRolesLogout())
        this.store.dispatch(userInfoLogout())
        this.quangAuthService.stopRefreshToken()
        this.quangAuthService.logout()
      }
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
