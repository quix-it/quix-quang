import { Injectable } from '@angular/core'

import { Store } from '@ngrx/store'
import { map, mergeMap } from 'rxjs/operators'

import { QuangOpenIdConnectService } from '../../oidc.service'

import { userLogin, userNotAuthenticated } from '../actions/oidc.actions'

import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects'

@Injectable({
  providedIn: 'root'
})
export class QuangLoginEffects {
  /**
   * Effect that is triggered when the store is initialized,
   * starts the login procedure,
   * if the user authenticates he dispatches the login action
   */
  startAuthEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap((action) =>
        this.quangAuthService.login().pipe(
          map((is) => {
            if (is && this.quangAuthService.isAuthenticated()) {
              this.quangAuthService.startRefreshToken()
              return userLogin()
            }
            return userNotAuthenticated()
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
  constructor(
    private readonly actions$: Actions,
    private readonly quangAuthService: QuangOpenIdConnectService,
    private readonly store: Store<any>
  ) {}
}
