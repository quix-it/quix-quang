import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { QuangLoaderInterceptor, QuangLoaderModule, loaderInterceptor } from '@quix/quang/components/loader'
import { QuangTranslationModule } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    importProvidersFrom([
      QuangTranslationModule.forRoot({
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        fallbackLang: 'it'
      }),
      QuangLoaderModule.forRoot()
    ])
  ]
}
