import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import {
  selectHasRoles,
  selectHasUntilRoles,
  selectIsAuthenticated,
  selectUserInfo,
  selectUserRoles
} from '../../../../../quang/auth/src/lib/quang-auth-store/selectors/quang-auth.selectors'
import { QuangAuthModuleState } from '../../../../../quang/auth/src/lib/quang-auth-module.reducer'

@Component({
  selector: 'auth-auth-selector',
  templateUrl: './auth-selector.component.html',
  styles: []
})
export class AuthSelectorComponent {
  user: Observable<any> = this.store.pipe(select(selectUserInfo))
  roles: Observable<any> = this.store.pipe(select(selectUserRoles))
  is: Observable<any> = this.store.pipe(select(selectIsAuthenticated))
  all: Observable<any> = this.store.select(
    selectHasRoles(['quake_usermanager_admin'])
  )

  until: Observable<any> = this.store.select(
    selectHasUntilRoles(['quake_usermanager_admin'])
  )

  constructor (private readonly store: Store<QuangAuthModuleState>) {}
}
