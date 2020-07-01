import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {exhaustMap, map} from "rxjs/operators";
import {QuixAuthService} from "./services/quix-auth.service";

import {userInfoLogin, userLogin} from "./store/user.action";


@Injectable({
  providedIn: 'root'
})
export class QuixAuthEffects {
  constructor(
    private actions$: Actions,
    private quixAuthService: QuixAuthService,
  ) {
  }

  startAuthEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(action =>
        this.quixAuthService.startAuth().pipe(
          map(is => userLogin({isLogged: is}))
        )
      )
    )
  );

  getInfoUserEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(action =>
        this.quixAuthService.initUserInfo().pipe(
          map(user => userInfoLogin({userData: user}))
        )
      )
    )
  );

  setLocaleEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(userInfoLogin),
      exhaustMap(action =>
        this.quixAuthService.initLanguageAndLocale(action.userData.locale)
      )
    ),{dispatch: false}
  );

}


