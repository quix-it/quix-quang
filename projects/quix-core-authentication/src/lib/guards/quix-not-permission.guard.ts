import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {selectInfoUser} from "../store/user.selector";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuixNotPermissionGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(selectInfoUser),
      filter(u => !!u),
      map((u: any) => {
        let find = false
        route.data.allRoles.forEach( r =>
          find = find || u.realm_access.roles.includes(r)
        )
        if(!find){
          this.router.navigate(['403'])
        }
        return find
      })
    )
  }

}
