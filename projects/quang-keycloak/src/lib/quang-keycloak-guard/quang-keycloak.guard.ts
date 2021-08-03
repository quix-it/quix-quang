import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import {
  catchError, filter, map, switchMap, take,
} from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { selectHasRoles, selectHasUntilRoles, selectUserInfo } from '../quang-keycloak-store/quang-keycloak.selector'

@Injectable({
  providedIn: 'root',
})
export class QuangKeycloakGuard implements CanActivate {

  constructor (
    private readonly authStore: Store<any>,
    private readonly router: Router
  ) {
  }

  /**
   * check if the user has all the required roles saved in the store
   * @param allowedRoles
   */
  checkAllRole (allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasRoles, { rolesId: allowedRoles }),
      take(1)
    )
  }

  /**
   * check if the user has at least one required role saved in the store
   * @param allowedRoles
   */
  checkUntilRole (allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasUntilRoles, { rolesId: allowedRoles }),
      take(1)
    )
  }

  canActivate (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStore.pipe(
      select(selectUserInfo),
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
