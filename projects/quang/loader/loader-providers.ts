import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { UrlData } from '../shared/intercept-utils'
import { LOADER_EXCLUDED_URLS } from './loader.interceptor'

/**
 * @example
 * @see UrlData for expected input of array of exclueded urls
 * providers: [
 * provideLoader([
      {
        url: 'assets',
        method: 'GET',
      },
    ])
   ]
 */
export function provideLoader(urlData: UrlData[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LOADER_EXCLUDED_URLS,
      useValue: urlData,
    },
  ])
}
