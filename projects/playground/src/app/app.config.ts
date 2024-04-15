import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { QuangLoaderModule } from '@quix/quang/components/loader/loader.module'
import { QuangTranslationModule } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(QuangLoaderModule.forRoot()),
    importProvidersFrom(
      QuangTranslationModule.forRoot({
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        fallbackLang: 'it'
      })
    )
  ]
}
