;(function () {
  'use strict'
  const DOMAIN = ''
  const API_DOMAIN = ''
  const VERSION = '999.9.9-SNAPSHOT'
  const SENTRY = '"https://f5b8570161b947dca6e6f2124bfaa979@sentry.quix.it/47"'
  const EVENTBUS = ''
  window.FontAwesomeConfig = { autoReplaceSvg: 'nest' }
  window.quixConfig = {
    noLoaderUrls: [],
    noLoaderMethods: [],
    blankApiUrl: `${API_DOMAIN}`,
    baseUrl: `${DOMAIN}/`,
    appVersion: `${VERSION}`,
    sentryDsn: `${SENTRY}`,
    eventBusUrl: `${EVENTBUS}`
  }
  /**
   * this object must be compiled if an identity provider other than keycloak is used with the @quix/quang:quang-auth
   * @type {{redirectUri: string, showDebugInformation: boolean, clientId: string, userinfoEndpoint: string, oidc: boolean, issuer: string, postLogoutRedirectUri: string, responseType: string, loginUrl: string, logoutUrl: string, scope: string, disableAtHashCheck: boolean, apiTokenUrl: [string]}}
   */
  window.oidcConfig = {
    issuer: `${DOMAIN}/auth/realms/blank`,
    loginUrl: `${DOMAIN}/auth/realms/blank/protocol/openid-connect/auth`,
    redirectUri: `${DOMAIN}/blank`,
    clientId: 'blank',
    responseType: 'code',
    disableAtHashCheck: true,
    scope: 'openid profile email',
    showDebugInformation: true,
    logoutUrl: `${DOMAIN}/auth/realms/blank/protocol/openid-connect/logout`,
    postLogoutRedirectUri: `${DOMAIN}/blank`,
    oidc: true,
    userinfoEndpoint: `${DOMAIN}/auth/realms/blank/protocol/openid-connect/userinfo`,
    apiTokenUrl: ['rest/v1']
  }
  /**
   * this object must be filled in if keycloak is used as an identity provider with the @ quix/quang:quang-keycloak
   * @type {{bearerExcludedUrls: [string], initOptions: {silentCheckSsoRedirectUri: string, onLoad: string}, config: {clientId: string, realm: string, url: string}}}
   */
  /*
  window.keycloakConfig = {
    config: {
      url: '/auth',
      realm: 'quake',
      clientId: 'quake'
    },
    initOptions: {
      onLoad: 'login-required',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/static/silent-check-sso.html'
      // redirectUri: 'https://localhost/blank'
    },
    bearerExcludedUrls: ['/assets']
  }
   */
})()
