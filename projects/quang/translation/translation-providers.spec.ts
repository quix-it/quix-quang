import { provideTranslation, withTranslation } from './translation-providers'

describe('Translation Providers', () => {
  it('provideTranslation should be defined', () => {
    expect(provideTranslation).toBeDefined()
  })

  it('withTranslation should be defined', () => {
    expect(withTranslation).toBeDefined()
  })

  // TODO: Add tests for provider configuration
})
