import { APP_INITIALIZER, Injector, NgZone, Provider } from '@angular/core'

import { App, URLOpenListenerEvent } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'

import { MobileAuthFeature, OPEN_URI, QuangAuthFeatureKind, QuangAuthService, quangAuthFeature } from '@quix/quang/auth'

export function withMobileAuth(
  toolbarColor: string = '#000000',
  presentationStyle: 'popover' | 'fullscreen' = 'popover'
): MobileAuthFeature {
  const providers: Provider[] = [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [QuangAuthService, NgZone],
      useFactory: (authService: QuangAuthService, ngZone: NgZone) => {
        return () => {
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
      }
    },
    {
      provide: OPEN_URI,
      deps: [],
      useFactory: () => {
        return (url: string) => {
          if (Capacitor.isNativePlatform()) {
            if (Capacitor.getPlatform() === 'ios')
              Browser.addListener('browserFinished', () => {
                window.location.reload()
              })
            Browser.open({ url, presentationStyle, toolbarColor })
          } else location.href = url
        }
      }
    }
  ]
  return quangAuthFeature(QuangAuthFeatureKind.MobileAuthFeature, providers)
}
