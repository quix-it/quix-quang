import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  computed,
  inject,
  makeEnvironmentProviders,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { patchState, signalState } from '@ngrx/signals'

import { QUANG_LOGGING_BEHAVIOR } from '@quang'
import { AuthConfig, OAuthErrorEvent, OAuthEvent, OAuthService } from 'angular-oauth2-oidc'
import { filter, firstValueFrom } from 'rxjs'

export const AUTH_CONFIG = new InjectionToken<QuangAuthConfig | undefined>('AUTH_CONFIG')

export interface QuangAuthConfig extends AuthConfig {
  autoLogin: boolean
  sendAccessToken: boolean
  urlsToSendToken: string[]
  revokeTokensOnLogout?: boolean
  getUserProfileOnLoginSuccess?: boolean
  useSilentRefresh: boolean
}

export function provideQuangAuthConfig(authConfig?: QuangAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: AUTH_CONFIG, useValue: authConfig }])
}

export const OPEN_URI = new InjectionToken<(uri: string) => void | undefined>('OPEN_URI')

export function provideOpenURI(openURI: (uri: string) => void | undefined): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: OPEN_URI, deps: [], useFactory: openURI }])
}

interface LoginStatus {
  checked: boolean
  authenticationError: boolean
}

interface TokenStatus {
  accessToken: string | null
  accessTokenExpiresAt: number | null
  idToken: string | null
  idTokenExpiresAt: number | null
  refreshToken: string | null
}

interface AuthState {
  loginStatus: LoginStatus
  tokenStatus: TokenStatus
  roles: Set<string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any> | null
}

const initialState: AuthState = {
  loginStatus: {
    checked: false,
    authenticationError: false,
  },
  tokenStatus: {
    accessToken: null,
    accessTokenExpiresAt: null,
    idToken: null,
    idTokenExpiresAt: null,
    refreshToken: null,
  },
  roles: new Set<string>(),
  user: null,
}

// Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
// Only the ones where it's reasonably sure that sending the user to the IdServer will help.
const errorResponsesRequiringUserInteraction = [
  'interaction_required',
  'login_required',
  'account_selection_required',
  'consent_required',
]

@Injectable({
  providedIn: 'root',
})
export class QuangAuthService {
  private config: QuangAuthConfig

  logLevel = inject(QUANG_LOGGING_BEHAVIOR, { optional: true })

  private oAuthService = inject(OAuthService, { optional: true })

  private state = signalState<AuthState>(initialState)

  loginChecked = this.state.loginStatus.checked

  isAuthenticated = computed(() => !!this.state.tokenStatus.accessToken())

  authenticationError = this.state.loginStatus.authenticationError

  tokenStatus = this.state.tokenStatus

  roles = this.state.roles

  user = this.state.user

  constructor() {
    const authConfig = inject(AUTH_CONFIG)
    if (!authConfig) throw new Error('Missing auth config')

    const openUri = inject(OPEN_URI, { optional: true })
    if (openUri) authConfig.openUri = openUri

    this.config = authConfig

    this.oAuthService?.events.pipe(takeUntilDestroyed()).subscribe((event: OAuthEvent) => {
      if (this.logLevel === 'verbose') console.debug('Auth service event', event)
      if (event instanceof OAuthErrorEvent && this.loginChecked()) this.loginError()
      if (event.type === 'token_received') this.setTokens()
    })
    this.oAuthService?.configure(this.config)
  }

  public async init() {
    this.oAuthService?.setupAutomaticSilentRefresh()

    await this.oAuthService?.loadDiscoveryDocumentAndTryLogin()

    await this.checkForAuthentication()

    if (this.config.autoLogin && !this.isAuthenticated()) this.login()
  }

  public async checkForAuthentication(forceRefresh = false) {
    let hasValidToken = this.oAuthService?.hasValidAccessToken()

    try {
      if (forceRefresh) hasValidToken = await this.refreshAuth()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const reason = error?.reason
      if (this.config.autoLogin && reason && errorResponsesRequiringUserInteraction.includes(reason)) this.login()
      hasValidToken = false
    }

    this.setTokens()
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        checked: true,
      },
    })

    if (hasValidToken && this.config.getUserProfileOnLoginSuccess) await this.getUserProfile()

    return hasValidToken
  }

  private async refreshAuth() {
    if (this.config.responseType === 'code') await this.oAuthService?.refreshToken()
    else await this.oAuthService?.silentRefresh()
    return this.oAuthService?.hasValidAccessToken()
  }

  public login() {
    this.oAuthService?.initLoginFlow()
  }

  public async logout() {
    if (!this.isAuthenticated()) return
    if (this.config.revokeTokensOnLogout) await this.oAuthService?.revokeTokenAndLogout()
    else this.oAuthService?.logOut()
    patchState(this.state, { ...initialState })
  }

  private loginError() {
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        authenticationError: true,
      },
    })
    this.logout()
  }

  public async getUserProfile() {
    const user = await this.oAuthService?.loadUserProfile()
    if (user) patchState(this.state, { user })
  }

  private setTokens() {
    const tokenStatus = {
      accessToken: this.oAuthService?.getAccessToken() ?? null,
      accessTokenExpiresAt: this.oAuthService?.getAccessTokenExpiration() ?? null,
      idToken: this.oAuthService?.getIdToken() ?? null,
      idTokenExpiresAt: this.oAuthService?.getIdTokenExpiration() ?? null,
      refreshToken: this.oAuthService?.getRefreshToken() ?? null,
    }
    if (this.logLevel === 'verbose') {
      const now = new Date()
      const accessTokenDate = new Date(tokenStatus.accessTokenExpiresAt ?? '')
      const idTokenDate = new Date(tokenStatus.idTokenExpiresAt ?? '')
      console.table(tokenStatus)
      console.debug(
        `Id token expires at ${idTokenDate} in ${Math.abs(idTokenDate.valueOf() - now.valueOf()) / 1000 / 60} minutes`
      )
      console.debug(
        `Access token expires at ${accessTokenDate} in ${Math.abs(accessTokenDate.valueOf() - now.valueOf()) / 1000 / 60} minutes`
      )
    }
    patchState(this.state, {
      tokenStatus,
    })
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
