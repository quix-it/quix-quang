import { FormControl } from '@angular/forms'

import { EuroLocale, europeanVatNumber, fileMaxSize, fileMinSize, isVatNumber } from './validators'

describe('Form Validators', () => {
  describe('europeanVatNumber', () => {
    it('should be defined', () => {
      expect(europeanVatNumber).toBeDefined()
    })
  })

  describe('isVatNumber', () => {
    it('returns null on every validation of the same valid VAT number', () => {
      const control = new FormControl('12345678901', [isVatNumber([EuroLocale.IT])])

      const results = [control.errors]
      control.updateValueAndValidity()
      results.push(control.errors)
      control.updateValueAndValidity()
      results.push(control.errors)

      expect(results).toEqual([null, null, null])
    })

    it('validates distinct controls with the same locale independently', () => {
      const first = new FormControl('12345678901', [isVatNumber([EuroLocale.IT])])
      const second = new FormControl('12345678901', [isVatNumber([EuroLocale.IT])])

      expect([first.errors, second.errors]).toEqual([null, null])
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
