import { Injectable, InjectionToken, effect, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { patchState, signalState } from '@ngrx/signals'
import {
  AuthConfig,
  OAuthErrorEvent,
  OAuthEvent,
  OAuthService,
  OAuthSuccessEvent,
  ParsedIdToken
} from 'angular-oauth2-oidc'
import { EMPTY, mergeMap } from 'rxjs'

interface LoginStatus {
  isAuthenticated: boolean
  loginRequested: boolean
  authenticationError: boolean
}

interface TokenStatus {
  accessToken: string | undefined
  idToken: string | undefined
  refreshToken: string | undefined
}

interface AuthState {
  config: QuangAuthConfig | undefined
  autoLogin: boolean | undefined
  loginStatus: LoginStatus
  tokenStatus: TokenStatus
  parsedToken: QuangParsedIdToken | undefined
  roles: string[]
  user: object
}

export const AUTH_CONFIG = new InjectionToken<QuangAuthConfig | undefined>('AUTH_CONFIG')

export interface QuangAuthConfig extends AuthConfig {
  autoLogin: boolean
}

export interface QuangParsedIdToken extends ParsedIdToken {}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private injectedAuthConfig = inject(AUTH_CONFIG)
  private oAuthService = inject(OAuthService)
  private oauthEvents = this.oAuthService.events.pipe(
    takeUntilDestroyed(),
    mergeMap((event: OAuthEvent) => {
      if (event instanceof OAuthErrorEvent) {
        this.loginError()
      }
      if (event instanceof OAuthSuccessEvent && event.type === 'token_received') {
        this.loginSuccess()
      }

      if (event.type === 'session_terminated') {
        this.loginError()
      }

      if (event.type === 'token_received' || event.type === 'token_refreshed') {
        this.setTokens()
      }

      return EMPTY
    })
  )
  private state = signalState<AuthState>({
    config: this.injectedAuthConfig,
    autoLogin: this.injectedAuthConfig?.autoLogin,
    loginStatus: {
      isAuthenticated: false,
      loginRequested: false,
      authenticationError: false
    },
    tokenStatus: {
      accessToken: undefined,
      idToken: undefined,
      refreshToken: undefined
    },
    parsedToken: undefined,
    roles: [],
    user: {}
  })

  isAuthenticated = this.state.loginStatus.isAuthenticated
  loginRequested = this.state.loginStatus.loginRequested
  authenticationError = this.state.loginStatus.authenticationError
  tokenStatus = this.state.tokenStatus
  parsedToken = this.state.parsedToken
  roles = this.state.roles
  user = this.state.user
  private configEffect = effect(
    () => {
      const config = this.state.config()
      if (config) {
        this.oAuthService.configure(config)
        this.oAuthService.setupAutomaticSilentRefresh()
        if (this.state.autoLogin()) {
          this.login()
        }
      }
    },
    { allowSignalWrites: true }
  )

  updateConfig(config: QuangAuthConfig) {
    patchState(this.state, { config: { ...config, sessionChecksEnabled: true } })
  }

  addRoles(roles: string[]) {
    patchState(this.state, { roles: [...this.state.roles(), ...roles] })
  }

  removeRoles(roles: string[]) {
    patchState(this.state, { roles: this.state.roles().filter((role) => !roles.includes(role)) })
  }

  async login() {
    patchState(this.state, {
      loginStatus: {
        isAuthenticated: false,
        authenticationError: false,
        loginRequested: true
      }
    })
    const loadDiscoveryDocumentAndLogin = await this.oAuthService.loadDiscoveryDocumentAndLogin()
    if (!loadDiscoveryDocumentAndLogin) {
      this.oAuthService.initCodeFlow()
    } else {
      this.loginSuccess()
    }
  }

  private loginError() {
    patchState(this.state, {
      loginStatus: {
        isAuthenticated: false,
        authenticationError: true,
        loginRequested: true
      }
    })
  }

  private loginSuccess() {
    patchState(this.state, {
      loginStatus: {
        isAuthenticated: true,
        authenticationError: false,
        loginRequested: true
      }
    })
    this.getUserProfile().then()
  }

  private async getUserProfile() {
    const userProfile = await this.oAuthService.loadUserProfile()
    patchState(this.state, { user: userProfile })
  }

  private setTokens() {
    patchState(this.state, {
      tokenStatus: {
        accessToken: this.oAuthService.getAccessToken(),
        idToken: this.oAuthService.getIdToken(),
        refreshToken: this.oAuthService.getRefreshToken()
      }
    })
    this.parseToken()
  }

  private parseToken() {
    const idToken = this.tokenStatus.idToken()
    const accessToken = this.tokenStatus.accessToken()
    if (idToken && accessToken) {
      this.oAuthService.processIdToken(idToken, accessToken).then((parsedToken) => {
        patchState(this.state, {
          parsedToken
        })
      })
    }
  }
}
