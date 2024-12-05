import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { QuangFeature, QuangFeatureKind, quangFeature } from '@quix/quang'

import { EXCLUDED_URL, UrlData } from './loader-interceptor'

/**
 * @example
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideLoader([
 *       {
 *         url: 'assets',
 *         method: 'GET',
 *       },
 *     ])
 *   ]
 * }
 */
export function provideQuangLoaderExcludedUrls(excludedUrls: UrlData[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: EXCLUDED_URL,
      useValue: excludedUrls,
    },
  ])
}

export function withLoaderExcludedUrls(excludedUrls: UrlData[]): QuangFeature<QuangFeatureKind.LoaderFeature> {
  return quangFeature(QuangFeatureKind.LoaderFeature, [provideQuangLoaderExcludedUrls(excludedUrls)])
}

/**
 * @deprecated
 * @see {@link provideQuangLoaderExcludedUrls}
 */
export const provideLoader = provideQuangLoaderExcludedUrls
