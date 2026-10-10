import { FormControl } from '@angular/forms'

import { europeanVatNumber, fileMaxSize, fileMinSize, isFiscalCode } from './validators'

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

  describe('isFiscalCode', () => {
    it('returns a fiscalCode error when the value has characters before eleven trailing digits', () => {
      expect(isFiscalCode()(new FormControl('XYZ12345678901'))).toEqual({ fiscalCode: true })
    })

    it('returns a fiscalCode error when the value has twelve digits', () => {
      expect(isFiscalCode()(new FormControl('123456789012'))).toEqual({ fiscalCode: true })
    })
  })
})
