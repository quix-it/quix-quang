import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {QuixAuthService} from "../auth/quix-auth.service";
import {catchError, distinctUntilChanged} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class QuixAuthGuard implements CanActivate {
  constructor(private quixAuthService: QuixAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
    return this.quixAuthService.hasStoredRoles(route.data.allowedRoles).pipe(
      distinctUntilChanged(),
      catchError(error => of(false))
    )
  }
}
