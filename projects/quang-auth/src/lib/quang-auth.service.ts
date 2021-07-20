import { Injectable, Optional } from '@angular/core'

import { Store } from '@ngrx/store'
import { from, Observable, of } from 'rxjs'
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

  /**
   * call to Start the login process
   */
  startAuth (): Observable<any> {
    return of(this.oauthService.loadDiscoveryDocumentAndLogin())
  }

  /**
   * call to retrieve login data and try login
   */
  login () {
    return from(this.oauthService.loadDiscoveryDocumentAndTryLogin())
  }

  /**
   * Start the login process, if the process is successful dispatch the successful login
   */
  startAuthAndDispatch () {
    from(this.oauthService.loadDiscoveryDocumentAndLogin()).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.oauthService.setupAutomaticSilentRefresh()
        this.store.dispatch(userLogin())
      }
    })
  }

  /**
   * returns user data
   */
  getUserInfo () {
    return from(this.oauthService.loadUserProfile())
  }

  /**
   * call to retrieve user data
   */
  getUserInfoAndDispatch () {
    from(this.oauthService.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(userInfoLogin({ user: user }))
    })
  }

  /**
   * starts the token refresh
   */
  startRefreshToken () {
    this.oauthService.setupAutomaticSilentRefresh()
  }

  /**
   * stop the token refresh
   */
  stopRefreshToken () {
    this.oauthService.stopAutomaticRefresh()
  }

  /**
   * log out
   */
  logout () {
    return this.oauthService.logOut()
  }

  /**
   * log out and dispatch the actions to delete the user from the store
   */
  logoutAndDispatch () {
    this.store.dispatch(userLogout())
    this.store.dispatch(userInfoLogout())
    this.store.dispatch(userRolesLogout())
    this.oauthService.stopAutomaticRefresh()
    this.oauthService.logOut()
  }
}
