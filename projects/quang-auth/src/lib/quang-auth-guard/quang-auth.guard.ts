import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import {
  catchError, filter, map, switchMap, take
} from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { selectUserInfo, selectUserRoles } from '../quang-auth-store/selectors/quang-auth.selectors'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * role guard
 */
export class QuangAuthGuard implements CanActivate {
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

  /**
   * Observable that checks if the user has all the required roles
   * @param allowedRoles roles list
   */
  checkAllRole (allowedRoles: string[]): Observable<boolean> {
    return this.authStore
      .select(selectUserRoles)
      .pipe(
        map(roles =>
          allowedRoles
            .map(r => roles.includes(r))
            .reduce((find, resp) => find && resp, true)
        ),
        take(1)
      )
  }

  /**
   * Observable that checks if the user has until one of the required roles
   * @param allowedRoles role list
   */
  checkUntilRole (allowedRoles: string[]): Observable<boolean> {
    return this.authStore
      .select(selectUserRoles)
      .pipe(
        map(roles =>
          allowedRoles
            .map(r => roles.includes(r))
            .reduce((find, resp) => find || resp, false)
        ),
        take(1)
      )
  }

  /**
   * Retrieve user info if it exists, check if it has the necessary roles to view the page
   * @param route active route
   * @param state router state
   */
  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStore
      .select(selectUserInfo)
      .pipe(
        filter(user => !!user),
        take(1),
        switchMap(user => {
          if (route.data.condition === 'AND') {
            return this.checkAllRole(route.data.allowedRoles)
          }
          return this.checkUntilRole(route.data.allowedRoles)
        }),
        switchMap(find => {
          if (!find) {
            throwError(find)
          }
          return of(find)
        }),
        catchError(e => {
          this.router.navigate(['403'])
          return of(false)
        })
      )
  }
}
