import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {QuangKeycloakService} from "../quang-keycloak.service";
import {exhaustMap, map} from "rxjs/operators";
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from "./quang-keycloack.action";

@Injectable({providedIn: 'root'})
export class QuangKeycloackEffect {

  startAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quangKeycloakService.startAuth().pipe(
          map(is => userLogin())
        )
      )
    )
  );
  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(action =>
        this.quangKeycloakService.getUserInfo().pipe(
          map((user: any) => {
            return userInfoLogin({user: user})
          })
        )
      )
    )
  );
  getRolesUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(action =>
        this.quangKeycloakService.getUserRoles().pipe(
          map((roles: any) => {
            return userRolesLogin({roles: roles})
          })
        )
      )
    )
  );
  deleteUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogout),
      exhaustMap(action =>
        this.quangKeycloakService.logout().pipe(
          map(() => userRolesLogout()),
          map(() => userInfoLogout())
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private quangKeycloakService: QuangKeycloakService
  ) {
  }

}
