import { FormControl } from '@angular/forms'

import { dateBetween, europeanVatNumber, fileMaxSize, fileMinSize, maxDate, minDate } from './validators'

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

  describe('minDate', () => {
    it.each([null, ''])('returns no error when the field is empty (%j)', (value) => {
      expect(minDate(new Date(2020, 0, 1))(new FormControl(value))).toBeNull()
    })
  })

  describe('maxDate', () => {
    it.each([null, ''])('returns no error when the field is empty (%j)', (value) => {
      expect(maxDate(new Date(1960, 0, 1))(new FormControl(value))).toBeNull()
    })
  })

  describe('dateBetween', () => {
    it.each([null, ''])('returns no error when the field is empty (%j)', (value) => {
      expect(dateBetween(new Date(2020, 0, 1), new Date(2030, 0, 1))(new FormControl(value))).toBeNull()
    })
  })
})
