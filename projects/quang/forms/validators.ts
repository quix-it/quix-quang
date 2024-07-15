import { AbstractControl, ValidatorFn } from '@angular/forms'

import { isAfter, isBefore, isWithinInterval } from 'date-fns'

export const europeanVatNumber: Record<string, RegExp> = {
  AT: /U[0-9]{8}/gm,
  BE: /0[0-9]{9}/gm,
  BG: /[0-9]{9,10}/gm,
  CY: /[0-9]{8}L/gm,
  CZ: /[0-9]{8,10}/gm,
  DE: /[0-9]{9}/gm,
  DK: /[0-9]{8}/gm,
  EE: /[0-9]{9}/gm,
  GR: /[0-9]{9}/gm,
  ES: /[0-9A-Z][0-9]{7}[0-9A-Z]/gm,
  FI: /[0-9]{8}/gm,
  FR: /[0-9A-Z]{2}[0-9]{9}/gm,
  GB: /([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})/gm,
  HU: /[0-9]{8}/gm,
  IE: /[0-9]S[0-9]{5}L/gm,
  IT: /[0-9]{11}/gm,
  LT: /([0-9]{9}|[0-9]{12})/gm,
  LU: /[0-9]{8}/gm,
  LV: /[0-9]{11}/gm,
  MT: /[0-9]{8}/gm,
  NL: /[0-9]{9}B[0-9]{2}/gm,
  PL: /[0-9]{10}/gm,
  PT: /[0-9]{9}/gm,
  RO: /[0-9]{2,10}/gm,
  SE: /[0-9]{12}/gm,
  SI: /[0-9]{8}/gm,
  SK: /[0-9]{10}/gm
}
export function fileMaxSize(maxSize: number): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    if (control.value && control.value instanceof File && control.value?.size > maxSize) {
      return { maxSize: { requiredValue: maxSize } }
    }
    return null
  }
}

export function fileMinSize(minSize: number): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    if (control.value && control.value instanceof File && control.value?.size < minSize) {
      return { minSize: { requiredValue: minSize } }
    }
    return null
  }
}

export function isFile(): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    if (control.value && control.value instanceof File) {
      return null
    }
    return { isFile: {} }
  }
}

export function fileType(fileTypes: string[]) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (control.value && !fileTypes.includes(control.value?.type)) {
      return { fileType: { requiredValue: fileTypes.toString() } }
    }
    return null
  }
}

export function fileExtensions(fileExtensions: string[]) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (control.value && !fileExtensions.includes(control.value?.name?.match(/(?:\.([^.]+))?$/g)[0])) {
      return { fileExtension: { requiredValue: fileExtensions.toString() } }
    }
    return null
  }
}

export function requiredCheckbox() {
  return (control: AbstractControl): Record<string, any> | null => {
    if (!control.value) {
      return { required: { requiredValue: control.value } }
    }
    return null
  }
}

export function minDate(minDate: Date) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (isBefore(new Date(control.value), minDate)) {
      return { minDate: { requiredValue: minDate } }
    }
    return null
  }
}

export function maxDate(maxDate: Date) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (isAfter(new Date(control.value), maxDate)) {
      return { maxDate: { requiredValue: maxDate } }
    }
    return null
  }
}

export function dateBetween(start: Date, end: Date) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (
      !isWithinInterval(new Date(control.value), {
        start,
        end
      })
    ) {
      return { dateBetween: { requiredValue: [start, end] } }
    }
    return null
  }
}

export function isFiscalCode() {
  return (control: AbstractControl): Record<string, any> | null => {
    if (
      !/^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/gm.test(
        control.value.toUpperCase()
      )
    ) {
      return { fiscalCode: false }
    }
    return null
  }
}

export function isVatNumber(locale: string) {
  return (control: AbstractControl): Record<string, any> | null => {
    if (!europeanVatNumber[locale]?.test(control?.value)) {
      return { vatNumber: false }
    }
    return null
  }
}

export function wysiwygRequired() {
  return (control: AbstractControl): Record<string, any> | null => {
    const cleanHTML = control.value.replace(/<\/?[^>]+(>|$)/g, '')
    if (!cleanHTML?.length) {
      return { required: { required: true } }
    }
    return null
  }
}
