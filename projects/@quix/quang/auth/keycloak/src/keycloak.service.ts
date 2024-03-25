import { Injectable, Optional } from '@angular/core'

import { Store } from '@ngrx/store'
import { KeycloakOptions, KeycloakService } from 'keycloak-angular'
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js'
import { Observable, from, of } from 'rxjs'

import { QuangKeycloakActions } from './store/actions'

import { QuangKeycloakConfig } from './keycloak.config'

/**
 * service decorator
 */
@Injectable()
/**
 * utility for keycloak management
 */
export class QuangKeycloakService {
  /**
   * keycloak wrapper configuration
   */
  public authConfig: KeycloakOptions

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
   * window access
   */
  _window = (): any => window

  /**
   * starts the authentication flow
   */
  startAuth(): Observable<boolean> {
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
      } else {
        this.store.dispatch(QuangKeycloakActions.userNotLogin())
      }
    })
  }

  /**
   * retrieves the information relating to the logged in user
   */
  getUserProfile(): Observable<KeycloakProfile> {
    return from(this.keyCloak.loadUserProfile())
  }

  /**
   * get the mapped data inside the userInfo object from Keycloak JS Instance
   */
  getUserInfo() {
    return this.keyCloak.getKeycloakInstance().userInfo
  }

  /**
   * retrieves the information relating to the logged in user and saves them in the store
   */
  getUserInfoAndDispatch(): void {
    from(this.keyCloak.loadUserProfile()).subscribe((user: KeycloakProfile) => {
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
  login(redirectUri?: string): Observable<void> {
    return from(this.keyCloak.login({ redirectUri }))
  }

  /**
   * method to log out, is triggered by the effects
   * @param redirectUri
   */
  logout(redirectUri?: string): Observable<void> {
    if (redirectUri) {
      return from(this.keyCloak.logout(redirectUri))
    } else {
      console.log('[AUTH KEYCLOAK SERVICE] No logout redirectUri config')
      return from(this.keyCloak.logout())
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

  getParsedToken(): KeycloakTokenParsed | undefined {
    return this.keyCloak.getKeycloakInstance().tokenParsed
  }
}
