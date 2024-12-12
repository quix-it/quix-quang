import { Provider } from '@angular/core'

import { OAuthStorage } from 'angular-oauth2-oidc'

import { QuangAuthFeature, QuangAuthFeatureKind, quangAuthFeature } from '@quix/quang/auth'

export function withLocalStorage(): QuangAuthFeature<QuangAuthFeatureKind.LocalStorageFeature> {
  const providers: Provider[] = [
    {
      provide: OAuthStorage,
      useValue: localStorage,
    },
  ]
  return quangAuthFeature(QuangAuthFeatureKind.LocalStorageFeature, providers)
}
