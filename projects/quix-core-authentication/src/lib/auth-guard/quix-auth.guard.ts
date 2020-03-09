import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {QuixAuthService} from 'quix-core-authentication';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuixAuthGuard implements CanActivate {
  constructor(private quixAuthService: QuixAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.quixAuthService.getRoles().pipe(
      map((roles: Array<string>) => {
          let hasAllRole = true;
          route.data.allowedRoles.forEach((roleId: string) => {
            hasAllRole = hasAllRole && roles.includes(roleId);
          });
          return hasAllRole;
        },
        error => {
          alert('Unable to retrieve the list of roles');
          return false;
        }
      )
    );
  }
}
