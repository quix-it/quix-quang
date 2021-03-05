import {Injectable} from "@angular/core";
import {QuangAuthService} from "../quang-auth.service";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {exhaustMap, map} from "rxjs/operators";
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from "./quang-auth.action";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class QuangAuthEffect {
  startAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quangAuthService.startAuth().pipe(
          map(is => {
            this.quangAuthService.stopRefreshToken()
            return userLogin()
          })
        )
      )
    )
  );
  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(action =>
        this.quangAuthService.getUserInfo().pipe(
          map((user: any) => {
            return userInfoLogin({user: user})
          })
        )
      )
    )
  );
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
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private quangAuthService: QuangAuthService,
    private store: Store<any>
  ) {
  }


}
