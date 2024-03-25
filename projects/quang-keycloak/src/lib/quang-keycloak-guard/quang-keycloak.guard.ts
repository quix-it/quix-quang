import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import {
  catchError, filter, map, switchMap, take
} from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { QuangKeycloakSelectors } from '../quang-keycloak-store/selectors'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * role guard
 */
export class QuangKeycloakGuard implements CanActivate {
  /**
   * constructor
   * @param authStore auth store access
   * @param router router utility
   */
  constructor (
    private readonly authStore: Store<any>,
    private readonly router: Router
  ) {
  }

  /**
   * check if the user has all the required roles saved in the store
   * @param allowedRoles role list
   */
  checkAllRole (allowedRoles: string[]): Observable<boolean> {
    return this.authStore
      .select(QuangKeycloakSelectors.selectHasRoles(allowedRoles))
      .pipe(take(1))
  }

  /**
   * check if the user has at least one required role saved in the store
   * @param allowedRoles role list
   */
  checkUntilRole (allowedRoles: string[]): Observable<boolean> {
    return this.authStore
      .select(QuangKeycloakSelectors.selectHasUntilRoles(allowedRoles))
      .pipe(take(1))
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
      .select(QuangKeycloakSelectors.selectUserInfo)
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
