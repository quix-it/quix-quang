import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import {
  catchError, filter, map, switchMap, take,
} from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { selectHasRoles, selectHasUntilRoles, selectInfoUser } from '../store/user.selector'

@Injectable({
  providedIn: 'root',
})
export class QuixAuthStoreGuard implements CanActivate {

  constructor (
    private authStore: Store<any>,
    private router: Router
  ) {
  }

  checkAllRole (allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasRoles, { rolesId: allowedRoles }),
      take(1)
    )
  }

  checkUntilRole (allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasUntilRoles, { rolesId: allowedRoles }),
      take(1)
    )
  }

  canActivate (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStore.pipe(
      select(selectInfoUser),
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
