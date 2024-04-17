import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { QuangTranslationModule } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([
      QuangTranslationModule.forRoot({
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        fallbackLang: 'it'
      })
      // QuangLoaderModule.forRoot()
    ])
  ]
}
