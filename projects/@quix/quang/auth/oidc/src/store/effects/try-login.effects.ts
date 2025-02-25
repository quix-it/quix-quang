import { Injectable } from '@angular/core'

import { Store } from '@ngrx/store'
import { map, mergeMap } from 'rxjs/operators'

import { QuangOpenIdConnectService } from '../../oidc.service'

import { QuangOpenIdConnectActions } from '../actions'

import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects'

@Injectable({
  providedIn: 'root'
})
export class QuangTryLoginEffects {
  /**
   * Effect that is triggered when the store is initialized,
   */
  tryStartAuthEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        mergeMap((action) =>
          this.quangAuthService.tryLogin().pipe(
            map((is) => {
              if (is && this.quangAuthService.isAuthenticated()) {
                this.quangAuthService.startRefreshToken()
                this.store.dispatch(QuangOpenIdConnectActions.userLogin())
              } else {
                this.store.dispatch(QuangOpenIdConnectActions.userRolesLogout())
                this.store.dispatch(QuangOpenIdConnectActions.userInfoLogout())
              }
            })
          )
        )
      ),
    { dispatch: false }
  )

  /**
   * constructor
   * @param actions$ actions access
   * @param quangAuthService auth utility
   * @param store store access
   */
  constructor(
    private readonly actions$: Actions,
    private readonly quangAuthService: QuangOpenIdConnectService,
    private readonly store: Store<any>
  ) {}
}
