import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { QuangLoaderModule } from '@quix/quang/loader'
import { QuangTranslationModule } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom([
      QuangTranslationModule.forRoot({
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        fallbackLang: 'it'
      }),
      QuangLoaderModule.forRoot([
        {
          url: 'assets',
          method: 'GET'
        }
      ])
    ])
  ]
}
