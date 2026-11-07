import { QuangFeatureKind } from 'quang'

import { provideAuth, withAuth } from './auth-providers'

describe('Auth Providers', () => {
  it('provideAuth should be defined', () => {
    expect(provideAuth).toBeDefined()
  })

  it('withAuth should be tagged as AuthFeature', () => {
    expect(withAuth().ɵkind).toBe(QuangFeatureKind.AuthFeature)
  })

  // TODO: Add tests for provider configuration
})
