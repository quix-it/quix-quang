import { APP_INITIALIZER, EnvironmentProviders, NgZone, Provider } from '@angular/core'

import { App, URLOpenListenerEvent } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

import {
  QuangAuthFeature,
  QuangAuthFeatureKind,
  QuangAuthService,
  provideOpenURI,
  quangAuthFeature,
} from '@quix/quang/auth'

export function withMobileAuth(
  toolbarColor: string = '#000000',
  presentationStyle: 'popover' | 'fullscreen' = 'popover'
): QuangAuthFeature<QuangAuthFeatureKind.MobileAuthFeature> {
  const providers: (Provider | EnvironmentProviders)[] = [
    provideOpenURI((url: string) => {
      if (Capacitor.isNativePlatform()) {
        if (Capacitor.getPlatform() === 'ios')
          Browser.addListener('browserFinished', () => {
            window.location.reload()
          })
        Browser.open({ url, presentationStyle, toolbarColor })
        // eslint-disable-next-line no-restricted-globals
      } else location.href = url
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [QuangAuthService, NgZone],
      useFactory: (authService: QuangAuthService, ngZone: NgZone) => () => {
        if (Capacitor.isNativePlatform()) {
          App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            ngZone.run(() => {
              Browser.removeAllListeners()
              Browser.close()
              const [, queryParams] = event.url.split('?')
              // eslint-disable-next-line no-restricted-globals
              location.href = `/?${queryParams}`
            })
          })
          App.addListener('resume', () => {
            ngZone.run(() => {
              authService.init()
            })
          })
        }
      },
    },
  ]
  return quangAuthFeature(QuangAuthFeatureKind.MobileAuthFeature, providers)
}
