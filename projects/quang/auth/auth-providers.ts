import { provideHttpClient } from '@angular/common/http'
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { provideOAuthClient } from 'angular-oauth2-oidc'

import { AUTH_CONFIG, QuangAuthConfig } from './auth.service'

export function provideAuth(authConfig?: QuangAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AUTH_CONFIG,
      useValue: authConfig
    },
    provideHttpClient(),
    provideOAuthClient()
  ])
}
