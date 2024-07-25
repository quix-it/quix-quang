import { APP_INITIALIZER, EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core'

import { provideOAuthClient } from 'angular-oauth2-oidc'

import { type MobileAuthFeature } from '@quix/quang/auth/mobile'

import { AUTH_CONFIG, QuangAuthConfig, QuangAuthService } from './auth.service'

function initializeAuthService(authService: QuangAuthService) {
  return () => authService.init()
}

export function provideAuth(authConfig?: QuangAuthConfig, ...features: QuangAuthFeatures[]): EnvironmentProviders {
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
    },
    features.map((feature) => feature.ɵproviders)
  ])
}

/**
 * Helper type to represent a QuangAuth feature.
 *
 * @publicApi
 */
export interface QuangAuthFeature<FeatureKind extends QuangAuthFeatureKind> {
  ɵkind: FeatureKind
  ɵproviders: Provider[]
}

/**
 * Helper function to create an object that represents a Router feature.
 */
export function quangAuthFeature<FeatureKind extends QuangAuthFeatureKind>(
  kind: FeatureKind,
  providers: Provider[]
): QuangAuthFeature<FeatureKind> {
  return { ɵkind: kind, ɵproviders: providers }
}

/**
 * A type alias that represents all QuangAuth features available for use with `provideAuth`.
 * Features can be enabled by adding special functions to the `provideAuth` call.
 * See documentation for each symbol to find corresponding function name. See also `provideAuth`
 * documentation on how to use those functions.
 *
 * @see {@link provideAuth}
 *
 * @publicApi
 */
export type QuangAuthFeatures = MobileAuthFeature

/**
 * The list of features as an enum to uniquely type each feature.
 */
export const enum QuangAuthFeatureKind {
  MobileAuthFeature
}
