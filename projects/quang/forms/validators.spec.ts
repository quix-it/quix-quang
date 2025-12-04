import { europeanVatNumber, fileMaxSize, fileMinSize } from './validators'

describe('Form Validators', () => {
  describe('europeanVatNumber', () => {
    it('should be defined', () => {
      expect(europeanVatNumber).toBeDefined()
    })
  })

  describe('fileMaxSize', () => {
    it('should be defined', () => {
      expect(fileMaxSize).toBeDefined()
    })

    // TODO: Add tests for file size validation
  })

  describe('fileMinSize', () => {
    it('should be defined', () => {
      expect(fileMinSize).toBeDefined()
    })

    // TODO: Add tests for file size validation
  })
})
