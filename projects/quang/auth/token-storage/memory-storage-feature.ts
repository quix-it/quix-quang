import { Injectable, Provider } from '@angular/core'

import { OAuthStorage } from 'angular-oauth2-oidc'

import { QuangAuthFeature, QuangAuthFeatureKind, quangAuthFeature } from '../auth-providers'

@Injectable()
export class MemoryStorage implements OAuthStorage {
  private data = new Map<string, string>()

  getItem(key: string): string {
    return this.data.get(key) ?? ''
  }

  removeItem(key: string): void {
    this.data.delete(key)
  }

  setItem(key: string, data: string): void {
    this.data.set(key, data)
  }
}

export function withMemoryStorage(): QuangAuthFeature<QuangAuthFeatureKind.MemoryStorageFeature> {
  const providers: Provider[] = [
    {
      provide: OAuthStorage,
      useFactory: () => new MemoryStorage(),
    },
  ]
  return quangAuthFeature(QuangAuthFeatureKind.MemoryStorageFeature, providers)
}
