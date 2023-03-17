import { KeycloakOnLoad } from 'keycloak-js'

export const environment = {
  production: true,
  sentry: {
    tracesSampleRate: 5.0,
    captureConsole: ['error']
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
