import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { QuangOpenIdConnectSelectors } from '@quix/quang/auth/oidc'

@Component({
  selector: 'auth-auth-selector',
  templateUrl: './auth-selector.component.html',
  styles: []
})
export class AuthSelectorComponent {
  user: Observable<any> = this.store.pipe(
    select(QuangOpenIdConnectSelectors.selectUserInfo)
  )
  roles: Observable<any> = this.store.pipe(
    select(QuangOpenIdConnectSelectors.selectUserRoles)
  )
  is: Observable<any> = this.store.pipe(
    select(QuangOpenIdConnectSelectors.selectIsAuthenticated)
  )
  all: Observable<any> = this.store.select(
    QuangOpenIdConnectSelectors.selectHasEveryRole(['quake_usermanager_admin'])
  )

  until: Observable<any> = this.store.select(
    QuangOpenIdConnectSelectors.selectHasAtLeastOneRole([
      'quake_usermanager_admin'
    ])
  )

  constructor(private readonly store: Store) {}
}
