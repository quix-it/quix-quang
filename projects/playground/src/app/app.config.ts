import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { provideAngularSvgIcon } from 'angular-svg-icon'
import { MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown'
import { provideQuangConfig } from 'quang'
import { logoutOnErrorInterceptor, withAuth, withLogoutOnError, withSessionStorage } from 'quang/auth'
import { quangLoaderInterceptor, withLoaderExcludedUrls } from 'quang/loader'
import { withTranslation } from 'quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([quangLoaderInterceptor, logoutOnErrorInterceptor])),
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideQuangConfig(
      { verbose: true, baseHref: '/quix-quang/' },
      withTranslation({
        availableLangs: ['it', 'en'],
        defaultLang: 'en',
        fallbackLang: 'en',
      }),
      withLoaderExcludedUrls([
        {
          url: 'assets',
          method: 'GET',
        },
      ]),
      withAuth(
        {
          issuer: 'https://demo.duendesoftware.com',
          clientId: 'interactive.public', // The "Auth Code + PKCE" client
          responseType: 'code',
          redirectUri: `${window.location.origin}/`,
          scope: 'openid profile email api offline_access', // Ask offline_access to support refresh token refreshes
          useSilentRefresh: false, // Explicitly set this to false, otherwise code flow will try to use an iframe to refresh session
          timeoutFactor: 0.25, // For faster testing
          sessionChecksEnabled: false,
          showDebugInformation: false, // Also requires enabling "Verbose" level in devtools
          clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
          nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding,
          sendAccessToken: true,
          urlsToSendToken: ['https://demo.duendesoftware.com/api'],
          autoLogin: false, // set this to true to automatically log in
          getUserProfileOnLoginSuccess: true, // set this to true to fetch user info from auth provider
        },
        withSessionStorage(),
        withLogoutOnError([], [401, 402, 403])
      )
    ),
    provideMarkdown({
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          darkMode: true,
          look: 'handDrawn',
        },
      },
    }),
  ],
}
