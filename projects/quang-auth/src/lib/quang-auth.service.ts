import { Injectable, Optional } from '@angular/core'
import { Store } from '@ngrx/store'
import { from, Observable, of } from 'rxjs'
import {
  userInfoLogin, userInfoLogout,
  userLogin,
  userLogout,
  userRolesLogout
} from './quang-auth-store/quang-auth.action'
import { QuangAuthConfig } from './quang-auth.config'
import { OAuthService } from 'angular-oauth2-oidc'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for auth management
 */
export class QuangAuthService {
  /**
   * module configurations
   */
  public config: any
  /**
   * configurations for authentication
   */
  public authConfig: any
  /**
   * window access
   */
  private _window = (): any => window

  /**
   * constructor
   * @param config module config
   * @param oauthService auth utility
   * @param store store access
   */
  constructor (
    @Optional() config: QuangAuthConfig,
    private readonly oauthService: OAuthService,
    private readonly store: Store<any>,
  ) {
    if (config) {
      this.config = config
    }
    if (this._window().oidcConfig) {
      this.authConfig = this._window().oidcConfig
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
  login (): Observable<any> {
    return from(this.oauthService.loadDiscoveryDocumentAndTryLogin())
  }

  /**
   * Start the login process, if the process is successful dispatch the successful login
   */
  startAuthAndDispatch (): void {
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
  getUserInfo (): Observable<any> {
    return from(this.oauthService.loadUserProfile())
  }

  /**
   * call to retrieve user data
   */
  getUserInfoAndDispatch (): void {
    from(this.oauthService.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(userInfoLogin({ user: user }))
    })
  }

  /**
   * starts the token refresh
   */
  startRefreshToken (): void {
    this.oauthService.setupAutomaticSilentRefresh()
  }

  /**
   * stop the token refresh
   */
  stopRefreshToken (): void {
    this.oauthService.stopAutomaticRefresh()
  }

  /**
   * log out
   */
  logout (): void {
    this.oauthService.logOut()
  }

  /**
   * log out and dispatch the actions to delete the user from the store
   */
  logoutAndDispatch (): void {
    this.store.dispatch(userLogout())
    this.store.dispatch(userInfoLogout())
    this.store.dispatch(userRolesLogout())
    this.oauthService.stopAutomaticRefresh()
    this.oauthService.logOut()
  }
}
