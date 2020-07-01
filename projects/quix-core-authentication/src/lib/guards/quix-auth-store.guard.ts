import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {
  catchError, filter, switchMap,
} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectHasRoles, selectInfoUser} from "../store/user.selector";


@Injectable({
  providedIn: 'root',
})
export class QuixAuthStoreGuard implements CanActivate {

  constructor(private authStore: Store<any>) {
  }


  checkRole(allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasRoles, {rolesId: allowedRoles})
    )
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authStore.pipe(
      select(selectInfoUser),
      filter(user => user !== null),
      switchMap(user => this.checkRole(route.data.allowedRoles)),
      catchError(e => {
        alert('[AUTH GUARD] No role in store')
        return of(false)
      })
    )
  }
}
