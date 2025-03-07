import { EnvironmentProviders, NgZone, Provider, inject, provideAppInitializer } from '@angular/core'

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
  toolbarColor = '#000000',
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
      } else location.href = url
    }),
    provideAppInitializer(() => {
      if (!Capacitor.isNativePlatform()) return

      const ngZone: NgZone = inject(NgZone)
      const authService: QuangAuthService = inject(QuangAuthService)
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
    }),
  ]
  return quangAuthFeature(QuangAuthFeatureKind.MobileAuthFeature, providers)
}
