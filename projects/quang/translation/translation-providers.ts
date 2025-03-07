import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'

import { provideTransloco } from '@jsverse/transloco'

import { QuangFeature, QuangFeatureKind, quangFeature } from '@quix/quang'

import { QuangTranslationLoaderService } from './translation-loader.service'
import { QuangTranslationService } from './translation.service'

import { AVAILABLE_LANGS, DEFAULT_LANG, FALLBACK_LANG, TRANSLATIONS_BASE_PATH } from './translations.tokens'

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

/**
 * @example
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideTranslation({
 *       availableLangs: ['it', 'en'],
 *       defaultLang: 'it',
 *       fallbackLang: 'it',
 *     })
 *   ]
 * }
 */
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
          allowEmpty: config.allowEmpty ?? false,
        },
      },
      loader: QuangTranslationLoaderService,
    }),
    {
      provide: AVAILABLE_LANGS,
      useValue: config.availableLangs,
    },
    {
      provide: DEFAULT_LANG,
      useValue: config.defaultLang,
    },
    {
      provide: FALLBACK_LANG,
      useValue: config.fallbackLang,
    },
    {
      provide: TRANSLATIONS_BASE_PATH,
      useValue: config.translationsBasePath,
    },
  ])
}

export function withTranslation(config: TranslationConfig): QuangFeature<QuangFeatureKind.TranslationFeature> {
  return quangFeature(QuangFeatureKind.TranslationFeature, [provideTranslation(config)])
}
