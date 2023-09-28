import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import {
  selectHasRoles,
  selectHasUntilRoles,
  selectIsAuthenticated,
  selectUserInfo,
  selectUserRoles
} from '../../../../../quang/auth/oidc/src/lib/quang-auth-store/selectors/quang-auth.selectors'

@Component({
  selector: 'ks-selector',
  templateUrl: './selector.component.html',
  styles: []
})
export class SelectorComponent {
  user: Observable<any> = this.store.select(selectUserInfo)
  roles: Observable<any> = this.store.select(selectUserRoles)
  is: Observable<any> = this.store.select(selectIsAuthenticated)
  all: Observable<any> = this.store.select(
    selectHasRoles(['quake_usermanager_admin'])
  )

  until: Observable<any> = this.store.select(
    selectHasUntilRoles(['quake_usermanager_admin'])
  )

  constructor (private readonly store: Store<any>) {}
}
