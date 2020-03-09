import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {haveRoles, QuixAuthService, RoleState} from 'quix-core-authentication';
import {filter, map, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class QuixAuthStoreGuard implements CanActivate {

  constructor(private roleStore: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roleStore.pipe(
      select(haveRoles, route.data.allowedRoles),
      map((resp: any) => resp,
        error => {
          alert('Unable to retrieve the list of roles');
          return false;
        })
    );
  }
}
