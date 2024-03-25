import { Injectable } from '@angular/core'

import { map, mergeMap } from 'rxjs/operators'

import { QuangKeycloakService } from '../../keycloak.service'

import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userNotLogin,
  userRolesLogin,
  userRolesLogout,
  userStartAuth
} from '../actions/keycloak.actions'

import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects'

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
  // add an effect startupEffect$ to the action init that fires the action userStartAuth
  startupEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map((action) => userStartAuth())
    )
  )

  /**
   * If the user completes the login dispatches the successful login
   * and saves the user data and roles in the store
   */
  startAuthEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userStartAuth),
      mergeMap((action) =>
        this.quangKeycloakService.startAuth().pipe(
          map((isLogged: boolean) => {
            if (isLogged) {
              return userLogin()
            } else {
              return userNotLogin()
            }
          })
        )
      )
    )
  )

  /**
   * When the login procedure is completed and the successful login is sent,
   * it recovers the user data and saves them in the store
   */
  getInfoUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) =>
        this.quangKeycloakService.getUserProfile().pipe(
          map((user: any) => {
            return userInfoLogin({ user })
          })
        )
      )
    )
  )

  /**
   * When the login procedure is completed and the successful login is sent,
   * it recovers the user role and saves them in the store
   */
  getRolesUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) =>
        this.quangKeycloakService.getUserRoles().pipe(map((roles: string[]) => userRolesLogin({ roles })))
      )
    )
  )

  /**
   * When the logout action is triggered,
   * it performs the logout procedure and cleans the store of user data
   */
  deleteUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogout),
      mergeMap((action) =>
        this.quangKeycloakService.logout(action.redirectUri).pipe(
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
  constructor(
    private readonly actions$: Actions,
    private readonly quangKeycloakService: QuangKeycloakService
  ) {}
}
