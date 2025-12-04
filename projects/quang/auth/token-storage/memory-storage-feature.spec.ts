import { MemoryStorage, withMemoryStorage } from './memory-storage-feature'

describe('MemoryStorageFeature', () => {
  it('MemoryStorage should be defined', () => {
    expect(MemoryStorage).toBeDefined()
  })

  it('withMemoryStorage should be defined', () => {
    expect(withMemoryStorage).toBeDefined()
  })

  // TODO: Add tests for memory storage operations
})
