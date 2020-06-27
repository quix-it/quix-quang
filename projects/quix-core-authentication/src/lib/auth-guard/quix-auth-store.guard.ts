import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {haveRoles} from "../auth/store/role.selector";


@Injectable({
  providedIn: 'root',
})
export class QuixAuthStoreGuard implements CanActivate {

  constructor(private roleStore: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roleStore
      .pipe(
        select(haveRoles, {roleIds: route.data.allowedRoles}),
        distinctUntilChanged()
      );
  }
}
