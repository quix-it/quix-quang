import { Injectable, InjectionToken, computed, inject } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { patchState, signalState } from '@ngrx/signals'
import { AuthConfig, OAuthErrorEvent, OAuthEvent, OAuthService, ParsedIdToken } from 'angular-oauth2-oidc'
import { filter, firstValueFrom } from 'rxjs'

interface LoginStatus {
  requested: boolean
  checked: boolean
  authenticationError: boolean
}

interface TokenStatus {
  accessToken: string | null
  idToken: string | null
  refreshToken: string | null
}

interface AuthState {
  loginStatus: LoginStatus
  tokenStatus: TokenStatus
  parsedToken: QuangParsedIdToken | null
  roles: Set<string>
  user: Record<string, any> | null
}

export const AUTH_CONFIG = new InjectionToken<QuangAuthConfig | undefined>('AUTH_CONFIG')

export interface QuangAuthConfig extends AuthConfig {
  autoLogin: boolean
  sendAccessToken: boolean
  urlsToSendToken: string[]
  revokeTokensOnLogout?: boolean
  getUserProfileOnLoginSuccess?: boolean
}

export interface QuangParsedIdToken extends ParsedIdToken {}

const initialState: AuthState = {
  loginStatus: {
    requested: false,
    checked: false,
    authenticationError: false
  },
  tokenStatus: {
    accessToken: null,
    idToken: null,
    refreshToken: null
  },
  parsedToken: null,
  roles: new Set<string>(),
  user: null
}

@Injectable({
  providedIn: 'root'
})
export class QuangAuthService {
  private config: QuangAuthConfig
  showDebugInformation = false

  private oAuthService = inject(OAuthService)

  private state = signalState<AuthState>(initialState)

  loginRequested = this.state.loginStatus.requested
  loginChecked = this.state.loginStatus.checked
  isAuthenticated = computed(() => !!this.state.tokenStatus.accessToken())
  authenticationError = this.state.loginStatus.authenticationError
  tokenStatus = this.state.tokenStatus
  parsedToken = this.state.parsedToken
  roles = this.state.roles
  user = this.state.user

  constructor() {
    const authConfig = inject(AUTH_CONFIG)
    if (!authConfig) throw new Error('Missing auth config')

    this.config = authConfig
    this.showDebugInformation = !!authConfig.showDebugInformation

    this.oAuthService.events.pipe(takeUntilDestroyed()).subscribe((event: OAuthEvent) => {
      if (event instanceof OAuthErrorEvent) {
        this.loginError()
        console.error(event)
      } else if (this.showDebugInformation) console.info(event)
    })
    this.oAuthService.configure(this.config)

    this.init()
  }

  async init() {
    if (this.config.useSilentRefresh !== false) this.oAuthService.setupAutomaticSilentRefresh()

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin()

    const isAuthenticated = await this.checkForAuthentication()

    if (!isAuthenticated && this.config.autoLogin) await this.login()
  }

  async checkForAuthentication() {
    const token = this.oAuthService.getAccessToken()
    if (token) await this.loginSuccess()
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        checked: true
      }
    })
    return !!token
  }

  async login() {
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        requested: true
      }
    })
    this.oAuthService.initLoginFlow()
    return await this.checkForAuthentication()
  }

  async logout() {
    if (this.config.revokeTokensOnLogout) await this.oAuthService.revokeTokenAndLogout()
    else this.oAuthService.logOut()
    patchState(this.state, { ...initialState })
  }

  private loginError() {
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        authenticationError: true
      }
    })
  }

  private async loginSuccess() {
    if (this.config.getUserProfileOnLoginSuccess !== false) await this.getUserProfile()
    this.setTokens()
  }

  async getUserProfile() {
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

  async waitForLoginCheck(): Promise<void> {
    await firstValueFrom(toObservable(this.loginChecked).pipe(filter((checked) => checked)))
  }

  async getAuthResult(): Promise<boolean> {
    await this.waitForLoginCheck()
    return this.isAuthenticated()
  }

  addRoles(rolesToAdd: string[]) {
    patchState(this.state, { roles: new Set([...this.state.roles().values(), ...rolesToAdd]) })
  }

  removeRoles(rolesToRemove: string[]) {
    const newRoles = new Set(this.roles().values())
    for (const roleToRemove of rolesToRemove) {
      newRoles.delete(roleToRemove)
    }
    patchState(this.state, { roles: newRoles })
  }

  hasEveryRole(roles: string[]) {
    return roles.every((role) => this.roles().has(role))
  }

  hasAtLeastOneRole(roles: string[]) {
    return roles.some((role) => this.roles().has(role))
  }
}
