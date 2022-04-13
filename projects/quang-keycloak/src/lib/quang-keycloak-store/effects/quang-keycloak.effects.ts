import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { QuangKeycloakService } from '../../quang-keycloak.service'
import { map, mergeMap } from 'rxjs/operators'
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from '../actions/quang-keycloak.actions'

/**
 * effect decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * auth effect
 */
export class QuangKeycloakEffects {
  /**
   * When the store is started,
   * Start the login procedure,
   * if the user completes the login dispatches the successful login
   */
  startAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(action => this.quangKeycloakService.startAuth()
        .pipe(
          map(is => userLogin())
        )
      )
    )
  )

  /**
   * When the login procedure is completed and the successful login is sent,
   * it recovers the user data and saves them in the store
   */
  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      mergeMap(action => this.quangKeycloakService.getUserInfo()
        .pipe(
          map((user: any) => {
            return userInfoLogin({ user: user })
          })
        )
      )
    )
  )

  /**
   * When the login procedure is completed and the successful login is sent,
   * it recovers the user role and saves them in the store
   */
  getRolesUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      mergeMap(action => this.quangKeycloakService.getUserRoles()
        .pipe(
          map((roles: string[]) => userRolesLogin({ roles: roles }))
        )
      )
    )
  )

  /**
   * When the logout action is triggered,
   * it performs the logout procedure and cleans the store of user data
   */
  deleteUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogout),
      mergeMap(action => this.quangKeycloakService.logout(action.redirectUri)
        .pipe(
          map(() => userRolesLogout()),
          map(() => userInfoLogout())
        )
      )
    )
  )

  /**
   * constructor
   * @param actions$
   * @param quangKeycloakService
   */
  constructor (
    private readonly actions$: Actions,
    private readonly quangKeycloakService: QuangKeycloakService
  ) {
  }
}
