import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { provideAngularSvgIcon } from 'angular-svg-icon'

import { ON_STATUS_LOGOUT, logoutOnIntercept, provideAuth } from '@quix/quang/auth'
import { provideLoader, quangLoaderInterceptor } from '@quix/quang/loader'
import { provideTranslation } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([quangLoaderInterceptor, logoutOnIntercept])),
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideAuth(
      {
        issuer: 'https://demo.duendesoftware.com',
        clientId: 'interactive.public', // The "Auth Code + PKCE" client
        responseType: 'code',
        redirectUri: `${window.location.origin}/`,
        scope: 'openid profile email api offline_access', // Ask offline_access to support refresh token refreshes
        useSilentRefresh: false, // Explicitly set this to false, otherwise code flow will try to use an iframe to refresh session
        timeoutFactor: 0.25, // For faster testing
        sessionChecksEnabled: true,
        showDebugInformation: false, // Also requires enabling "Verbose" level in devtools
        clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
        nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding,
        sendAccessToken: true,
        urlsToSendToken: ['https://demo.duendesoftware.com/api'],
        autoLogin: false, // set this to true to automatically log in
        oidc: true,
      },
      'sessionStorage'
    ),
    provideTranslation({
      availableLangs: ['it', 'en'],
      defaultLang: 'it',
      fallbackLang: 'it',
    }),
    provideLoader([
      {
        url: 'assets',
        method: 'GET',
      },
    ]),
    { provide: ON_STATUS_LOGOUT, useValue: [401, 402, 403] },
  ],
}
