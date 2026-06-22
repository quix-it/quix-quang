import { provideQuangLoaderExcludedUrls, withLoaderExcludedUrls } from './loader-providers'

describe('Loader Providers', () => {
  it('provideQuangLoaderExcludedUrls should be defined', () => {
    expect(provideQuangLoaderExcludedUrls).toBeDefined()
  })

  it('withLoaderExcludedUrls should be defined', () => {
    expect(withLoaderExcludedUrls).toBeDefined()
  })

  // TODO: Add tests for provider configuration
})
