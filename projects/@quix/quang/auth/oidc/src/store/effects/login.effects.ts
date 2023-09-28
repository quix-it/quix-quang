import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, mergeMap } from 'rxjs/operators'

import { QuangOpenIdConnectService } from '../../oidc.service'
import { userLogin } from '../actions/oidc.actions'

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
