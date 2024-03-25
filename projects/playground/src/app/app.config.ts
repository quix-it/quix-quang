import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { QuangTranslationModule } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      QuangTranslationModule.forRoot({
        availableLangs: ['it'],
        defaultLang: 'it',
        fallbackLang: 'it'
      })
    )
  ]
}
