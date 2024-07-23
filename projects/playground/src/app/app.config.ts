import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { provideAngularSvgIcon } from 'angular-svg-icon'

import { provideAuth } from '@quix/quang/auth'
import { provideLoader, quangLoaderInterceptor } from '@quix/quang/loader'
import { provideTranslation } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([quangLoaderInterceptor])),
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideAuth({
      issuer: 'https://demo.duendesoftware.com',
      clientId: 'interactive.public', // The "Auth Code + PKCE" client
      responseType: 'code',
      redirectUri: `${window.location.origin}/`,
      scope: 'openid profile email api offline_access', // Ask offline_access to support refresh token refreshes
      useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
      silentRefreshTimeout: 5000, // For faster testing
      timeoutFactor: 0.25, // For faster testing
      sessionChecksEnabled: true,
      showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
      clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
      nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding,
      sendAccessToken: true,
      urlsToSendToken: ['https://demo.duendesoftware.com/api'],
      autoLogin: true
    }),
    provideTranslation({
      availableLangs: ['it', 'en'],
      defaultLang: 'it',
      fallbackLang: 'it'
    }),
    provideLoader([
      {
        url: 'assets',
        method: 'GET'
      }
    ])
  ]
}
