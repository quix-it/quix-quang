import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'

import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoModule, translocoConfig } from '@ngneat/transloco'

import { QuangTranslationLoaderService } from './quang-translation-loader.service'

let forRootInstances = 0

export const AVAILABLE_LANGS = new InjectionToken<string[]>('AVAILABLE_LANGS')
export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG')
export const FALLBACK_LANG = new InjectionToken<string>('FALLBACK_LANG')

@NgModule({
  exports: [TranslocoModule],
  imports: [TranslocoModule]
})
export class QuangTranslationModule {
  static forRoot({
    availableLangs,
    defaultLang,
    fallbackLang
  }: {
    availableLangs: string[]
    defaultLang: string
    fallbackLang: string
  }): ModuleWithProviders<QuangTranslationModule> {
    forRootInstances++
    if (forRootInstances > 1) {
      throw new Error(
        'QuangTranslationModule.forRoot() called multiple times. Import it in the AppModule or CoreModule only'
      )
    }
    return {
      ngModule: QuangTranslationModule,
      providers: [
        {
          provide: TRANSLOCO_CONFIG,
          useValue: translocoConfig({
            availableLangs: availableLangs,
            defaultLang: defaultLang,
            fallbackLang: fallbackLang,
            reRenderOnLangChange: true,
            prodMode: true,
            failedRetries: 1,
            missingHandler: {
              logMissingKey: true,
              useFallbackTranslation: true,
              allowEmpty: false
            }
          })
        },
        QuangTranslationLoaderService,
        {
          provide: TRANSLOCO_LOADER,
          useClass: QuangTranslationLoaderService
        },
        {
          provide: AVAILABLE_LANGS,
          useValue: availableLangs
        },
        {
          provide: DEFAULT_LANG,
          useValue: defaultLang
        },
        {
          provide: FALLBACK_LANG,
          useValue: fallbackLang
        }
      ]
    }
  }
}
