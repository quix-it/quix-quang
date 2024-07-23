import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { provideOAuthClient } from 'angular-oauth2-oidc'

import { AUTH_CONFIG, QuangAuthConfig, QuangAuthService } from './auth.service'

function initializeAuthService(authService: QuangAuthService) {
  return () => authService.init()
}

export function provideAuth(authConfig?: QuangAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AUTH_CONFIG,
      useValue: authConfig
    },
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: authConfig?.sendAccessToken ?? true,
        allowedUrls: authConfig?.urlsToSendToken ?? []
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthService,
      multi: true,
      deps: [QuangAuthService]
    }
  ])
}
