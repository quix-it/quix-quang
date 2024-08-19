import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { EXCLUDED_URL, UrlData } from './loader-interceptor'

export function provideLoader(urlData: UrlData[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: EXCLUDED_URL,
      useValue: urlData,
    },
  ])
}

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
