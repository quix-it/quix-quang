// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakOnLoad } from 'keycloak-js'

export const environment = {
  production: false,
  sentry: {
    tracesSampleRate: 1.0,
    captureConsole: ['error', 'warn']
  },
  googleKey: 'AIzaSyCr1K_rKb6uiDP0EXJx0ErjuoBXbmtiah4',
  keycloakConfig: {
    config: {
      url: '/auth',
      realm: 'quake',
      clientId: 'quake'
    },
    initOptions: {
      onLoad: 'login-required' as KeycloakOnLoad,
      silentCheckSsoRedirectUri: `${window.location.origin}/assets/static/silent-check-sso.html`
    },
    bearerExcludedUrls: ['/assets']
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
