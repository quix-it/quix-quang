import { APP_INITIALIZER, Injector, NgZone, Provider } from '@angular/core'

import { App, URLOpenListenerEvent } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

import {
  AUTH_CONFIG,
  MobileAuthFeature,
  QuangAuthFeatureKind,
  QuangAuthService,
  quangAuthFeature
} from '@quix/quang/auth'

export function withMobileAuth(): MobileAuthFeature {
  const providers: Provider[] = [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [QuangAuthService, NgZone],
      useFactory: (authService: QuangAuthService, ngZone: NgZone) => {
        if (Capacitor.isNativePlatform()) {
          App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            ngZone.run(() => {
              Browser.removeAllListeners()
              Browser.close()
              const [, queryParams] = event.url.split('?')
              location.href = `/?${queryParams}`
            })
          })
          App.addListener('resume', () => {
            ngZone.run(() => {
              authService.init()
            })
          })
        }
      }
    },
    {
      provide: AUTH_CONFIG,
      deps: [Injector],
      useFactory: (injector: Injector) => {
        const existingConfig = injector.get(AUTH_CONFIG)
        if (!existingConfig) throw new Error('Missing QuangAuthConfig to extend')
        return existingConfig
      }
    }
  ]
  return quangAuthFeature(QuangAuthFeatureKind.MobileAuthFeature, providers)
}
