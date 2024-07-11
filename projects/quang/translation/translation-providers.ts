import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core'

import { provideTransloco } from '@jsverse/transloco'

import { QuangTranslationLoaderService } from './translation-loader.service'
import { QuangTranslationService } from './translation.service'

export interface TranslationConfig {
  availableLangs: string[]
  defaultLang: string
  fallbackLang: string
  translationsBasePath?: string
  reRenderOnLangChange?: boolean
  prodMode?: boolean
  failedRetries?: number
  logMissingKey?: boolean
  useFallbackTranslation?: boolean
  allowEmpty?: boolean
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
        reRenderOnLangChange: config.reRenderOnLangChange ?? true,
        prodMode: config.prodMode ?? true,
        failedRetries: config.failedRetries ?? 1,
        missingHandler: {
          logMissingKey: config.logMissingKey ?? true,
          useFallbackTranslation: config.useFallbackTranslation ?? true,
          allowEmpty: config.allowEmpty ?? false
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
