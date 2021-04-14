import { Injectable, Optional } from '@angular/core'
import { Store } from '@ngrx/store'
import { from, of } from 'rxjs'
import { KeycloakService } from 'keycloak-angular'
import {
  userInfoLogin,
  userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin, userRolesLogout
} from './quang-keycloak-store/quang-keycloak.action'
import { QuangKeycloakConfig } from './quang-keycloak.config'

function _window (): any {
  return window
}

@Injectable({
  providedIn: 'root'
})
export class QuangKeycloakService {

  public authConfig: any

  constructor (
    @Optional() config: QuangKeycloakConfig,
    private keyCloak: KeycloakService,
    private store: Store<any>,
  ) {
    if (_window().keycloakConfig) {
      this.authConfig = _window().keycloakConfig
    } else if (config?.keycloakConfig) {
      this.authConfig = config.keycloakConfig
    } else {
      alert('[AUTH KEYCLOAK SERVICE] No auth config')
    }
  }

  startAuth () {
    return from(this.keyCloak.init(this.authConfig))
  }

  startAuthAndDispatch () {
    from(this.keyCloak.init(this.authConfig)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.store.dispatch(userLogin())
      }
    })
  }

  getUserInfo () {
    return from(this.keyCloak.loadUserProfile())
  }

  getUserInfoAndDispatch () {
    from(this.keyCloak.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(userInfoLogin({ user: user }))
    })
  }

  getUserRoles () {
    return of(this.keyCloak.getUserRoles(true))
  }

  getUserRolesAndDispatch () {
    from(this.keyCloak.getUserRoles(true)).subscribe((roles: any) => {
      this.store.dispatch(userRolesLogin({ roles: roles }))
    })
  }

  login () {
    return from(this.keyCloak.login())
  }

  logout () {
    if (this.authConfig.config?.redirectUri) {
      return from(this.keyCloak.logout(this.authConfig.config?.redirectUri))
    } else {
      alert('[AUTH KEYCLOAK SERVICE] No redirectUri config')
    }
  }

  logoutAndDispatch () {
    if (this.authConfig.config?.redirectUri) {
      from(this.keyCloak.logout(this.authConfig.config?.redirectUri)).subscribe(
        () => {
          this.store.dispatch(userLogout())
          this.store.dispatch(userInfoLogout())
          this.store.dispatch(userRolesLogout())
        }
      )
    } else {
      alert('[AUTH KEYCLOAK SERVICE] No redirectUri config')
    }
  }
}
