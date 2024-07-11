import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { provideLoader, quangLoaderInterceptor } from '@quix/quang/loader'
import { provideTranslation } from '@quix/quang/translation'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    //withInterceptors([quangLoaderInterceptor]),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([quangLoaderInterceptor])),
    provideRouter(routes),
    /*provideAuth({
      issuer: 'https://sdc-qas.calzedonia.com/auth/realms/quake',
      clientId: 'quake',
      showDebugInformation: true,
      redirectUri: window.location.origin + '/index.html',
      autoLogin: true,
      sendAccessToken: true,
      urlsToSendToken: ['https://sdc-qas.calzedonia.com/api']
    }),*/
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
