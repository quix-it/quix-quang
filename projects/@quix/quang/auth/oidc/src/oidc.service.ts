import { Injectable, Optional } from '@angular/core'
import { Store } from '@ngrx/store'
import { OAuthService } from 'angular-oauth2-oidc'
import { Observable, from } from 'rxjs'

import { QuangOpenIdConnectModuleState } from './oidc-module.reducer'
import { QuangOpenIdConnectConfig } from './oidc.config'
import { QuangAuthActions } from './store/actions'

@Injectable({
  providedIn: 'root'
})
export class QuangOpenIdConnectService {
  /**
   * module configurations
   */
  public config: any
  /**
   * configurations for authentication
   */
  public oidcConfig: any
  /**
   * window access
   */
  private readonly _window = (): any => window

  /**
   * constructor
   * @param config module config
   * @param oauthService auth utility
   * @param store store access
   */
  constructor(
    @Optional() config: QuangOpenIdConnectConfig,
    private readonly oauthService: OAuthService,
    private readonly store: Store<QuangOpenIdConnectModuleState>
  ) {
    if (config) {
      this.config = config
    }
    if (this._window()?.oidcConfig) {
      this.oidcConfig = this._window().oidcConfig
    } else if (this.config?.oidcConfig) {
      this.oidcConfig = this.config.oidcConfig
    }
    this.configureAuth()
  }

  configureAuth() {
    if (this.oidcConfig) {
      this.oauthService.setStorage(localStorage)
      this.oauthService.configure(this.oidcConfig)
    }
  }

  /**
   * Start the login process, if the user is not logged in, redirect to the identity provider
   */
  login(): Observable<any> {
    return from(this.oauthService.loadDiscoveryDocumentAndLogin())
  }

  /**
   * Starts the login process, if the user is not logged in it does not redirect to the identity provider
   */
  tryLogin(): Observable<any> {
    return from(this.oauthService.loadDiscoveryDocumentAndTryLogin())
  }

  /**
   * Start the login process, if the user is not logged in, redirect to the identity provider
   * if the process is successful dispatch the successful login
   */
  loginAndDispatch(): void {
    from(this.oauthService.loadDiscoveryDocumentAndLogin()).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.oauthService.setupAutomaticSilentRefresh()
          this.store.dispatch(QuangAuthActions.userLogin())
        }
      }
    )
  }

  /**
   * Starts the login process, if the user is not logged in it does not redirect to the identity provider
   * if the process is successful dispatch the successful login
   */
  tryLoginAndDispatch(): void {
    from(this.oauthService.loadDiscoveryDocumentAndTryLogin()).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.oauthService.setupAutomaticSilentRefresh()
          this.store.dispatch(QuangAuthActions.userLogin())
        }
      }
    )
  }

  isAuthenticated(): boolean {
    return !!this.oauthService.getIdentityClaims()
  }

  /**
   * returns user data
   */
  getUserInfo(): Observable<any> {
    return from(this.oauthService.loadUserProfile())
  }

  /**
   * call to retrieve user data
   */
  getUserInfoAndDispatch(): void {
    from(this.oauthService.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(QuangAuthActions.userInfoLogin({ user: user }))
    })
  }

  /**
   * starts the token refresh
   */
  startRefreshToken(): void {
    this.oauthService.setupAutomaticSilentRefresh()
  }

  /**
   * stop the token refresh
   */
  stopRefreshToken(): void {
    this.oauthService.stopAutomaticRefresh()
  }

  /**
   * log out
   */
  logout(): void {
    this.oauthService.logOut()
  }

  /**
   * log out and dispatch the actions to delete the user from the store
   */
  logoutAndDispatch(): void {
    this.store.dispatch(QuangAuthActions.userLogout())
    this.store.dispatch(QuangAuthActions.userInfoLogout())
    this.store.dispatch(QuangAuthActions.userRolesLogout())
    this.oauthService.stopAutomaticRefresh()
    this.oauthService.logOut()
  }

  /**
   * returns the current token id
   */
  getIdToken(): string {
    return this.oauthService.getIdToken()
  }

  /**
   * returns the current access token
   */
  getAccessToken(): string {
    return this.oauthService.getAccessToken()
  }
}
