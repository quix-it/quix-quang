/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule, JsonPipe } from '@angular/common'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import {
  QuangAuthService,
  QuangHasAtLeastOneRoleDirective,
  QuangHasEveryRoleDirective,
  QuangIsAuthenticatedDirective,
  QuangIsNotAuthenticatedDirective,
} from 'quang/auth'
import { QuangTranslationService } from 'quang/translation'
import { catchError, map, of } from 'rxjs'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'

@Component({
  selector: 'playground-auth-test',

  imports: [
    CommonModule,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangHasEveryRoleDirective,
    JsonPipe,
    ComponentDocumentationComponent,
  ],
  templateUrl: './auth-test.component.html',
  styleUrl: './auth-test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTestComponent {
  protected AuthTestComponent = AuthTestComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? '/assets/docs/auth.md' : '/assets/docs/auth.it.md'
  )

  http = inject(HttpClient)

  authService = inject(QuangAuthService)

  checkRole = this.authService.roles

  user = this.authService.user

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
