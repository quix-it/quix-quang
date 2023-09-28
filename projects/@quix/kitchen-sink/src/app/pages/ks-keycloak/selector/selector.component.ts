import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { QuangKeycloakSelectors } from '@quix/quang/auth/keycloak'
import { Observable } from 'rxjs'

@Component({
  selector: 'ks-selector',
  templateUrl: './selector.component.html',
  styles: []
})
export class SelectorComponent {
  user: Observable<any> = this.store.select(QuangKeycloakSelectors.selectUserInfo)
  roles: Observable<any> = this.store.select(QuangKeycloakSelectors.selectUserRoles)
  is: Observable<any> = this.store.select(QuangKeycloakSelectors.selectIsAuthenticated)
  all: Observable<any> = this.store.select(
    QuangKeycloakSelectors.selectHasEveryRole(['quake_usermanager_admin'])
  )

  until: Observable<any> = this.store.select(
    QuangKeycloakSelectors.selectHasAtLeastOneRole(['quake_usermanager_admin'])
  )

  constructor(private readonly store: Store<any>) {}
}
