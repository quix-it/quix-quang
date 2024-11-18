import { APP_INITIALIZER, EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core'

import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc'

import { AUTH_CONFIG, QuangAuthConfig, QuangAuthService } from './auth.service'

function initializeAuthService(authService: QuangAuthService) {
  return () => authService.init()
}

function localStorageFactory(): OAuthStorage {
  return localStorage
}

function sessionStorageFactory(): OAuthStorage {
  return sessionStorage
}

// function memoryStorageFactory(): OAuthStorage {
//   return new MemoryStorage()
// }

function getStorage(storage: 'localStorage' | 'sessionStorage') {
  switch (storage) {
    case 'localStorage':
      return { provide: OAuthStorage, useFactory: localStorageFactory }
    case 'sessionStorage':
      return { provide: OAuthStorage, useFactory: sessionStorageFactory }
    // case 'memoryStorage':
    //   return { provide: OAuthStorage, useFactory: memoryStorageFactory }
    default:
      return { provide: OAuthStorage, useFactory: sessionStorageFactory }
  }
}

export function provideAuth(
  authConfig?: QuangAuthConfig,
  storage: 'localStorage' | 'sessionStorage' = 'sessionStorage',
  ...features: QuangAuthFeatures[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AUTH_CONFIG,
      useValue: authConfig,
    },
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: authConfig?.sendAccessToken ?? true,
        allowedUrls: authConfig?.urlsToSendToken ?? [],
      },
    }),
    features.map((feature) => feature.ɵproviders),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthService,
      multi: true,
      deps: [QuangAuthService],
    },
    getStorage(storage),
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
 * A type alias for providers returned by `withMobileAuth` for use with `provideAuth`.
 *
 * @see {@link withMobileAuth}
 * @see {@link provideAuth}
 *
 * @publicApi
 */
export type MobileAuthFeature = QuangAuthFeature<QuangAuthFeatureKind.MobileAuthFeature>

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
  MobileAuthFeature,
}
