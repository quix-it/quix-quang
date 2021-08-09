import { Injectable } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'
import { isAfter, isBefore, isWithinInterval } from 'date-fns'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * custom validators
 */
export class QuixValidatorsService {

  /**
   * Check if the file size is smaller than required
   * @param maxSize
   */
  fileMaxSize (maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value instanceof File && control.value?.size > maxSize) {
        return { maxSize: { requiredValue: maxSize } }
      }
      return null
    }
  }

  /**
   * Check if the file size is larger than required
   * @param minSize
   */
  fileMinSize (minSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value instanceof File && control.value?.size < minSize) {
        return { minSize: { requiredValue: minSize } }
      }
      return null
    }
  }

  /**
   * Check if the passed object is a file
   */
  isFile (): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value instanceof File) {
        return null
      }
      return { 'isFile': {} }
    }
  }

  /**
   * Check if the file passed is of the type contained in the list of accepted ones
   * @param fileTypes
   */
  fileType (fileTypes: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && !fileTypes.includes(control.value?.type)) {
        return { fileType: { requiredValue: fileTypes.toString() } }
      }
      return null
    }
  }

  /**
   * Check if the passed file has extension contained in the list of accepted ones
   * @param fileExtensions
   */
  fileExtensions (fileExtensions: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && !fileExtensions.includes(control.value?.name?.match(/(?:\.([^.]+))?$/g)[0])) {
        return { fileExtension: { requiredValue: fileExtensions.toString() } }
      }
      return null
    }
  }

  /**
   * valid if a checkbox is mandatory
   */
  requiredCheckbox () {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return { required: { requiredValue: control.value } }
      }
      return null
    }
  }

  /**
   * Check if the past date is more than the necessary one
   * @param minDate
   */
  minDate (minDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isBefore(control.value, minDate)) {
        return { minDate: { requiredValue: minDate } }
      }
      return null
    }
  }

  /**
   * Check if the past date is earlier than needed
   * @param maxDate
   */
  maxDate (maxDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isAfter(control.value, maxDate)) {
        return { maxDate: { requiredValue: maxDate } }
      }
      return null
    }
  }

  /**
   * Check if the past date is between the past two
   * @param startDate
   * @param endDate
   * @param unit
   */
  dateBetween (startDate: Date, endDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isWithinInterval(control.value, { start: startDate, end: endDate })) {
        return { dateBetween: { requiredValue: [startDate, endDate] } }
      }
      return null
    }
  }
}
