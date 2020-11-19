import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {
  catchError, filter, map, switchMap,
} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectHasRoles, selectInfoUser} from "../store/user.selector";


@Injectable({
  providedIn: 'root',
})
export class QuixAuthStoreGuard implements CanActivate {

  constructor(
    private authStore: Store<any>,
    private router: Router
  ) {
  }


  checkRole(allowedRoles: string[]) {
    return this.authStore.pipe(
      select(selectHasRoles, {rolesId: allowedRoles}),
    )
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStore.pipe(
      select(selectInfoUser),
      filter(user => !!user),
      switchMap(user => this.checkRole(route.data.allowedRoles)),
      switchMap(find => {
        if (!find) {
         throw find
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
