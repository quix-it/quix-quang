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
import { AuthConfig, OAuthErrorEvent, OAuthEvent, OAuthService, ParsedIdToken } from 'angular-oauth2-oidc'
import { filter, firstValueFrom } from 'rxjs'

import { QUANG_LOGGING_BEHAVIOR } from '@quix/quang'

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

export interface QuangParsedIdToken extends ParsedIdToken {}

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
  idToken: string | null
  refreshToken: string | null
}

interface AuthState {
  loginStatus: LoginStatus
  tokenStatus: TokenStatus
  parsedToken: QuangParsedIdToken | null
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
    idToken: null,
    refreshToken: null,
  },
  parsedToken: null,
  roles: new Set<string>(),
  user: null,
}

@Injectable({
  providedIn: 'root',
})
export class QuangAuthService {
  private config: QuangAuthConfig

  logLevel = inject(QUANG_LOGGING_BEHAVIOR, { optional: true })

  private oAuthService = inject(OAuthService)

  private state = signalState<AuthState>(initialState)

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

    const openUri = inject(OPEN_URI, { optional: true })
    if (openUri) authConfig.openUri = openUri

    this.config = authConfig

    this.oAuthService.events.pipe(takeUntilDestroyed()).subscribe((event: OAuthEvent) => {
      if (event instanceof OAuthErrorEvent) {
        if (this.loginChecked()) {
          this.loginError()
          console.error(event)
        }
        // eslint-disable-next-line no-console
      } else if (this.logLevel === 'verbose') console.debug(event)
    })
    this.oAuthService.configure(this.config)
  }

  public async init() {
    this.oAuthService.setupAutomaticSilentRefresh()

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin()

    await this.checkForAuthentication()
  }

  public async checkForAuthentication() {
    let hasValidToken = this.oAuthService.hasValidAccessToken()

    if (!hasValidToken) {
      if (this.config.responseType === 'code') {
        if (this.config.autoLogin) this.login()
      } else {
        try {
          await this.oAuthService.silentRefresh()
          hasValidToken = this.oAuthService.hasValidAccessToken()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
          // Only the ones where it's reasonably sure that sending the user to the IdServer will help.
          const errorResponsesRequiringUserInteraction = [
            'interaction_required',
            'login_required',
            'account_selection_required',
            'consent_required',
          ]
          const reason = error?.reason
          if (this.config.autoLogin && reason && errorResponsesRequiringUserInteraction.includes(reason)) this.login()
        }
      }
    }

    if (hasValidToken) await this.loginSuccess()

    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        checked: true,
      },
    })
    return hasValidToken
  }

  public login() {
    this.oAuthService.initLoginFlow()
  }

  public async logout() {
    if (this.config.revokeTokensOnLogout) await this.oAuthService.revokeTokenAndLogout()
    else this.oAuthService.logOut()
    patchState(this.state, { ...initialState })
  }

  private loginError() {
    patchState(this.state, {
      loginStatus: {
        ...this.state().loginStatus,
        authenticationError: true,
      },
    })
  }

  private async loginSuccess() {
    if (this.config.getUserProfileOnLoginSuccess !== false) await this.getUserProfile()
    this.setTokens()
  }

  public async getUserProfile() {
    const userProfile = await this.oAuthService.loadUserProfile()
    patchState(this.state, { user: userProfile })
  }

  private setTokens() {
    patchState(this.state, {
      tokenStatus: {
        accessToken: this.oAuthService.getAccessToken(),
        idToken: this.oAuthService.getIdToken(),
        refreshToken: this.oAuthService.getRefreshToken(),
      },
    })
    this.parseToken()
  }

  private parseToken() {
    const idToken = this.tokenStatus.idToken()
    const accessToken = this.tokenStatus.accessToken()
    if (idToken && accessToken) {
      this.oAuthService.processIdToken(idToken, accessToken).then((parsedToken) => {
        patchState(this.state, {
          parsedToken,
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
