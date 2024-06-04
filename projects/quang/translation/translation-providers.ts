import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core'

import { provideTransloco } from '@ngneat/transloco'

import { QuangTranslationLoaderService } from './translation-loader.service'
import { QuangTranslationService } from './translation.service'

export interface TranslationConfig {
  availableLangs: string[]
  defaultLang: string
  fallbackLang: string
  translationsBasePath?: string
}

export const AVAILABLE_LANGS = new InjectionToken<string[]>('AVAILABLE_LANGS')
export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG')
export const FALLBACK_LANG = new InjectionToken<string>('FALLBACK_LANG')
export const TRANSLATIONS_BASE_PATH = new InjectionToken<string>('TRANSLATIONS_BASE_PATH')

export function provideTranslation(config: TranslationConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    QuangTranslationLoaderService,
    QuangTranslationService,
    provideTransloco({
      config: {
        availableLangs: config.availableLangs,
        defaultLang: config.defaultLang,
        fallbackLang: config.fallbackLang,
        reRenderOnLangChange: true,
        prodMode: true,
        failedRetries: 1,
        missingHandler: {
          logMissingKey: true,
          useFallbackTranslation: true,
          allowEmpty: false
        }
      },
      loader: QuangTranslationLoaderService
    }),
    {
      provide: AVAILABLE_LANGS,
      useValue: config.availableLangs
    },
    {
      provide: DEFAULT_LANG,
      useValue: config.defaultLang
    },
    {
      provide: FALLBACK_LANG,
      useValue: config.fallbackLang
    },
    {
      provide: TRANSLATIONS_BASE_PATH,
      useValue: config.translationsBasePath
    }
  ])
}
