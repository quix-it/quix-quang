import { Injectable } from '@angular/core'
import { QuangOpenIdConnectService } from '../../oidc.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { QuangOpenIdConnectActions } from '../actions'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
export class QuangAuthEffects {
  /**
   * Effect that is triggered when the effective login is dispatched, it recovers user data
   */
  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(QuangOpenIdConnectActions.userLogin),
      mergeMap(action =>
        this.quangAuthService.getUserInfo().pipe(
          map((user: any) => {
            return QuangOpenIdConnectActions.userInfoLogin({ user: user })
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
      ofType(QuangOpenIdConnectActions.userLogout),
      map(action => {
        this.store.dispatch(QuangOpenIdConnectActions.userRolesLogout())
        this.store.dispatch(QuangOpenIdConnectActions.userInfoLogout())
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
    private readonly quangAuthService: QuangOpenIdConnectService,
    private readonly store: Store<any>
  ) {
  }
}
