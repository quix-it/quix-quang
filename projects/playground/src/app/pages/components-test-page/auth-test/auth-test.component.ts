import { CommonModule } from '@angular/common'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { catchError, map, of } from 'rxjs'

import {
  QuangAuthService,
  QuangHasAtLeastOneRoleDirective,
  QuangHasEveryRoleDirective,
  QuangIsAuthenticatedDirective,
  QuangIsNotAuthenticatedDirective,
} from '@quix/quang/auth'

@Component({
  selector: 'playground-auth-test',
  standalone: true,
  imports: [
    CommonModule,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangHasEveryRoleDirective,
  ],
  templateUrl: './auth-test.component.html',
  styleUrl: './auth-test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTestComponent {
  http = inject(HttpClient)

  authService = inject(QuangAuthService)

  checkRole = this.authService.roles

  // Example to add user roles from user
  /* userSubscription$ = toObservable(this.authService.user)
    .pipe(
      takeUntilDestroyed(),
      tap((u) => console.log('u ---->', u)),
      map((user) => user?.['info'].realm_access.roles as string[]), // customize with your actual handling of roles
      filter((roles) => roles.length > 0),
      tap((roles) => {
        this.authService.addRoles(roles)
      })
    )
    .subscribe() */

  getProtectedApiResponse(): void {
    this.http
      .get<any>('https://demo.duendesoftware.com/api/test')
      .pipe(
        map((response) => response.find((i: any) => i.type === 'iss').value),
        map((iss) => `☁ API Success from ${iss}`),
        catchError((e: HttpErrorResponse) => of(`🌩 API Error: ${e.status} ${e.statusText}`))
      )
      .subscribe((res) => {
        console.log(res)
      })
  }

  editRoles(action: 'add' | 'remove', role: string) {
    if (action === 'add') this.authService.addRoles([role])

    if (action === 'remove') this.authService.removeRoles([role])
  }
}
