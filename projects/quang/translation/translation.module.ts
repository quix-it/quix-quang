import { InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core'

import { TranslocoModule, provideTransloco } from '@ngneat/transloco'

import { QuangTranslationLoaderService } from './translation-loader.service'

let forRootInstances = 0

export interface TranslationConfig {
  availableLangs: string[]
  defaultLang: string
  fallbackLang: string
}

export const AVAILABLE_LANGS = new InjectionToken<string[]>('AVAILABLE_LANGS')
export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG')
export const FALLBACK_LANG = new InjectionToken<string>('FALLBACK_LANG')

@NgModule({
  exports: [TranslocoModule],
  imports: [TranslocoModule]
})
export class QuangTranslationModule {
  providers: Provider[] = []

  static forRoot(config: TranslationConfig): ModuleWithProviders<QuangTranslationModule> {
    forRootInstances++
    if (forRootInstances > 1) {
      throw new Error(
        'QuangTranslationModule.forRoot() called multiple times. Import it in the AppModule or CoreModule only'
      )
    }
    return {
      ngModule: QuangTranslationModule,
      providers: [
        QuangTranslationLoaderService,
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
        }
      ]
    }
  }
}
