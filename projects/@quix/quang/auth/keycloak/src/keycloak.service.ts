import { Injectable, Optional } from '@angular/core'

import { Store } from '@ngrx/store'
import { KeycloakOptions, KeycloakService } from 'keycloak-angular'
import { Observable, from, of } from 'rxjs'

import { QuangKeycloakActions } from './store/actions'

import { QuangKeycloakConfig } from './keycloak.config'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for keycloak management
 */
export class QuangKeycloakService {
  /**
   * keycloak wrapper configuration
   */
  public authConfig: KeycloakOptions
  /**
   * window access
   */
  _window = (): any => window

  /**
   * constructor
   * @param config
   * @param keyCloak
   * @param store
   */
  constructor(
    @Optional() config: QuangKeycloakConfig,
    private readonly keyCloak: KeycloakService,
    private readonly store: Store<any>
  ) {
    if (this._window().keycloakConfig) {
      this.authConfig = this._window().keycloakConfig
    } else if (config?.keycloakConfig) {
      this.authConfig = config.keycloakConfig
    }
    if (config?.ionicApplication && this.authConfig.initOptions) {
      this.authConfig.initOptions.silentCheckSsoRedirectUri = `${window.location.origin}/assets/static/silent-check-sso.html`
      this.authConfig.initOptions.flow = 'standard'
      this.authConfig.initOptions.responseMode = 'fragment'
      this.authConfig.initOptions.checkLoginIframe = true
    }
  }

  /**
   * starts the authentication flow
   */
  startAuth(): Observable<any> {
    if (this.authConfig) {
      return from(this.keyCloak.init(this.authConfig))
    } else {
      return of(false)
    }
  }

  /**
   * starts the authentication flow and saves the authentication status in the store
   */
  startAuthAndDispatch(): void {
    from(this.keyCloak.init(this.authConfig)).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.store.dispatch(QuangKeycloakActions.userLogin())
      }
    })
  }

  /**
   * retrieves the information relating to the logged in user
   */
  getUserInfo(): Observable<any> {
    return from(this.keyCloak.loadUserProfile())
  }

  /**
   * retrieves the information relating to the logged in user and saves them in the store
   */
  getUserInfoAndDispatch(): void {
    from(this.keyCloak.loadUserProfile()).subscribe((user: any) => {
      this.store.dispatch(QuangKeycloakActions.userInfoLogin({ user }))
    })
  }

  /**
   * get the user's roles
   */
  getUserRoles(): Observable<string[]> {
    return of(this.keyCloak.getUserRoles(true))
  }

  /**
   * retrieves the user's roles and saves them in the store
   */
  getUserRolesAndDispatch(): void {
    this.store.dispatch(QuangKeycloakActions.userRolesLogin({ roles: this.keyCloak.getUserRoles(true) }))
  }

  /**
   * Login method, to be used if you are not using the authentication flow with effects
   */
  login(): Observable<any> {
    return from(this.keyCloak.login())
  }

  /**
   * method to log out, is triggered by the effects
   * @param redirectUri
   */
  logout(redirectUri?: string): Observable<any> {
    if (redirectUri) {
      return from(this.keyCloak.logout(redirectUri))
    } else {
      throw new Error('[AUTH KEYCLOAK SERVICE] No logout redirectUri config')
    }
  }

  /**
   * method to log out, it should only be used if you do not use the login effects
   * @param redirectUri
   */
  logoutAndDispatch(redirectUri?: string): void {
    if (redirectUri) {
      from(this.keyCloak.logout(redirectUri)).subscribe(() => {
        this.store.dispatch(QuangKeycloakActions.userLogout({ redirectUri }))
        this.store.dispatch(QuangKeycloakActions.userInfoLogout())
        this.store.dispatch(QuangKeycloakActions.userRolesLogout())
      })
    } else {
      alert('[AUTH KEYCLOAK SERVICE] No logout redirectUri config')
    }
  }

  getToken(): Observable<string> {
    return from(this.keyCloak.getToken())
  }

  getRefreshToken(): string | undefined {
    return this.keyCloak.getKeycloakInstance().refreshToken
  }
}
