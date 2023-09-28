import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, of, throwError } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'

import { QuangAuthSelectors } from '../store/selectors'
import {
  selectHasEveryRole,
  selectUserInfo
} from '../store/selectors/oidc.selectors'

@Injectable({
  providedIn: 'root'
})
export class QuangRolesGuard implements CanActivate {
  /**
   * constructor
   * @param authStore store access
   * @param router router access
   */
  constructor(
    private readonly authStore: Store<any>,
    private readonly router: Router
  ) {}

  /**
   * Observable that checks if the user has all the required roles
   * @param allowedRoles roles list
   */
  checkHasEveryRole(allowedRoles: string[]): Observable<boolean> {
    return this.authStore.select(selectHasEveryRole(allowedRoles)).pipe(take(1))
  }

  /**
   * Observable that checks if the user has until one of the required roles
   * @param allowedRoles role list
   */
  checkHasAtLeastOneRole(allowedRoles: string[]): Observable<boolean> {
    return this.authStore
      .select(QuangAuthSelectors.selectHasAtLeastOneRole(allowedRoles))
      .pipe(take(1))
  }

  /**
   * Retrieve user info if it exists, check if it has the necessary roles to view the page
   * @param route active route
   * @param state router state
   */
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authStore.select(selectUserInfo).pipe(
      filter((user) => !!user),
      take(1),
      switchMap(() => {
        if (route.data.condition === 'AND') {
          return this.checkHasEveryRole(route.data.allowedRoles)
        }
        return this.checkHasAtLeastOneRole(route.data.allowedRoles)
      }),
      switchMap((find) => {
        if (!find) {
          throwError(find)
        }
        return of(find)
      }),
      catchError((e) => {
        this.router.navigate(['403'])
        return of(false)
      })
    )
  }
}
