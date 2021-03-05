import { Injectable, Optional } from '@angular/core'

import { Store } from '@ngrx/store'
import { from, of } from 'rxjs'
import {
  userInfoLogin, userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogin,
  userRolesLogout
} from './quang-auth-store/quang-auth.action'


import { QuangAuthConfig } from './quang-auth.config'
import { OAuthService } from 'angular-oauth2-oidc'

function _window (): any {
  return window
}

@Injectable({
  providedIn: 'root'
})
export class QuangAuthService {
  public config: any
  public authConfig: any

  constructor (
    @Optional() config: QuangAuthConfig,
    private oauthService: OAuthService,
    private store: Store<any>,
  ) {
    if (config) {
      this.config = config
    }
    if (_window().oidcConfig) {
      this.authConfig = _window().oidcConfig
    } else if (this.config.oidcConfig) {
      this.authConfig = this.config.oidcConfig
    } else {
      alert('[AUTH SERVICE] No auth config')
    }
    this.oauthService.configure(this.authConfig)
  }

  startAuth () {
    return of(this.oauthService.loadDiscoveryDocumentAndLogin())
  }

  startAuthAndDispatch () {
    from(this.oauthService.loadDiscoveryDocumentAndLogin()).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.oauthService.setupAutomaticSilentRefresh()
        this.store.dispatch(userLogin())
      }
    })
  }

  getUserInfo () {
    return from(this.oauthService.loadUserProfile())
  }

  getUserInfoAndDispatch () {
    from(this.oauthService.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(userInfoLogin({ user: user }))
    })
  }

  login () {
    return from(this.oauthService.loadDiscoveryDocumentAndTryLogin())
  }

  startRefreshToken () {
    this.oauthService.setupAutomaticSilentRefresh()
  }

  stopRefreshToken () {
    this.oauthService.stopAutomaticRefresh()
  }

  logout () {
    return this.oauthService.logOut()
  }

  logoutAndDispatch () {
    this.store.dispatch(userLogout())
    this.store.dispatch(userInfoLogout())
    this.store.dispatch(userRolesLogout())
    this.oauthService.stopAutomaticRefresh()
    this.oauthService.logOut()
  }
}
