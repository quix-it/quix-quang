import { Provider } from '@angular/core'

import { OAuthStorage } from 'angular-oauth2-oidc'

import { QuangAuthFeature, QuangAuthFeatureKind, quangAuthFeature } from '@quix/quang/auth'

export function withSessionStorage(): QuangAuthFeature<QuangAuthFeatureKind.SessionStorageFeature> {
  const providers: Provider[] = [
    {
      provide: OAuthStorage,
      useValue: sessionStorage,
    },
  ]
  return quangAuthFeature(QuangAuthFeatureKind.SessionStorageFeature, providers)
}
