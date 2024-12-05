import { EnvironmentProviders, InjectionToken, Provider, makeEnvironmentProviders } from '@angular/core'

export const QUANG_CONFIG = new InjectionToken<QuangConfig>('QUANG_CONFIG')

export const QUANG_LOGGING_BEHAVIOR = new InjectionToken<'normal' | 'verbose'>('QUANG_LOGGING_BEHAVIOR')

export interface QuangConfig {
  verbose?: boolean
}

/** The list of features as an enum to uniquely type each feature. */
export const enum QuangFeatureKind {
  AuthFeature,
  TranslationFeature,
  LoaderFeature,
}

/** Helper type to represent a Quang feature. */
export interface QuangFeature<FeatureKind extends QuangFeatureKind> {
  ɵkind: FeatureKind
  ɵproviders: (Provider | EnvironmentProviders)[]
}

/** Helper function to create an object that represents a Quang feature. */
export function quangFeature<FeatureKind extends QuangFeatureKind>(
  kind: FeatureKind,
  providers: (Provider | EnvironmentProviders)[]
): QuangFeature<FeatureKind> {
  return { ɵkind: kind, ɵproviders: providers }
}

/**
 * A type alias that represents all Quang features available for use with `provideQuangConfig`.
 * Features can be enabled by adding special functions to the `provideQuangConfig` call.
 * See documentation for each symbol to find corresponding function name. See also `provideQuangConfig`
 * documentation on how to use those functions.
 *
 * @see {@link provideQuangConfig}
 */
export type QuangFeatures = QuangFeature<QuangFeatureKind>

export function provideQuangConfig(config?: QuangConfig, ...features: QuangFeatures[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: QUANG_LOGGING_BEHAVIOR, useValue: config?.verbose ? 'verbose' : 'normal' },
    features.map((feature) => feature.ɵproviders),
  ])
}
