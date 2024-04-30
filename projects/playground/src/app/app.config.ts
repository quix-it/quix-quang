import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { provideLoader } from '@quix/quang/loader'
import { provideTranslation } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // provideHttpClient(),
    provideRouter(routes),
    provideTranslation({
      availableLangs: ['it', 'en'],
      defaultLang: 'it',
      fallbackLang: 'it'
    }),
    provideLoader([
      {
        url: 'assets',
        method: 'GET'
      }
    ])
  ]
}
