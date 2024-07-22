import { CommonModule } from '@angular/common'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { catchError, map, of } from 'rxjs'

import {
  QuangAuthService,
  QuangHasAtLeastOneRoleDirective,
  QuangHasEveryRoleDirective,
  QuangIsAuthenticatedDirective,
  QuangIsNotAuthenticatedDirective
} from '@quix/quang/auth'

@Component({
  selector: 'playground-auth-test',
  standalone: true,
  imports: [
    CommonModule,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangHasEveryRoleDirective
  ],
  template: `
    <h1 *quangIsAuthenticated>Is Auth</h1>
    <h1 *quangIsNotAuthenticated>Is not Auth</h1>
    <h2 *quangHasAtLeastOneRole="['test1']">Has test1 role</h2>
    <h2 *quangHasEveryRole="['test2']">Has test2 role</h2>
    <h2 *quangHasEveryRole="['test1', 'test2']">Has test1 and test2</h2>
    <h2 *quangHasAtLeastOneRole="['test1', 'test2']">Has test1 or test2 role</h2>
    <button
      (click)="authService.logout()"
      type="button"
    >
      Logout
    </button>
    <button
      (click)="authService.login()"
      type="button"
    >
      Login
    </button>
    <button
      (click)="getProtectedApiResponse()"
      type="button"
    >
      Make test API call
    </button>
    <button
      (click)="editRoles('add', 'test1')"
      type="button"
    >
      Add Test1 role
    </button>
    <button
      (click)="editRoles('add', 'test2')"
      type="button"
    >
      Add Test2 role
    </button>
    <button
      (click)="editRoles('remove', 'test1')"
      type="button"
    >
      Remove Test1 role
    </button>
    <button
      (click)="editRoles('remove', 'test2')"
      type="button"
    >
      Remove Test2 role
    </button>
  `,
  styleUrl: './auth-test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthTestComponent {
  http = inject(HttpClient)
  authService = inject(QuangAuthService)
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
    switch (action) {
      case 'add':
        this.authService.addRoles([role])
        break
      case 'remove':
        this.authService.removeRoles([role])
        break
    }
  }
}
