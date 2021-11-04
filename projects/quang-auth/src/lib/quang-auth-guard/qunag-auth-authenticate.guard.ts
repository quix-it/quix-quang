import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { iif, Observable, of, throwError } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectIsAuthenticated } from '../quang-auth-store/quang-auth.selector'
import { catchError, concatMap, delay, retryWhen, switchMap } from 'rxjs/operators'

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
/**
 *
 */
export class QunagAuthAuthenticateGuard implements CanActivate {
  /**
   * constructor
   * @param authStore store access
   * @param router router access
   */
  constructor (
    private readonly authStore: Store<any>,
    private readonly router: Router
  ) {
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStore.pipe(
      select(selectIsAuthenticated),
      switchMap((is) => !is ? throwError('not authenticated') : of(is)),
      retryWhen(e => e.pipe(
        concatMap((e, i) => iif(
          () => i > 10,
          throwError(e),
          of(e).pipe(delay(500))
        ))
      )),
      catchError(e => {
        this.router.navigate(['404'])
        return of(false)
      })
    )
  }
}
