import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class QuixValidatorsService {

  constructor() {
  }

  fileMaxSize(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof File && control.value?.size > maxSize) {
        return {maxSize: {requiredValue: maxSize}};
      }
      return null;
    };
  }

  fileMinSize(minSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof File && control.value?.size < minSize) {
        return {minSize: {requiredValue: minSize}};
      }
      return null;
    };
  }


  isFile(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof File) {
        return null
      }
      return {'isFile': {}}
    }
  }

  fileType(fileTypes: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!fileTypes.includes(control.value?.type)) {
        return {fileType: {requiredValue: fileTypes.toString()}};
      }
      return null;
    };
  }

  fileExtensions(fileExtensions: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!fileExtensions.includes(control.value?.name.match(/(?:\.([^.]+))?$/g)[0])) {
        return {fileExtension: {requiredValue: fileExtensions.toString()}};
      }
      return null;
    };
  }

  requiredCheckbox() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return {required: {requiredValue: control.value}};
      }
      return null;
    };
  }

  minDate(minDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (moment(control.value).isBefore(moment(minDate))) {
        return {'minDate': {requiredValue: minDate}}
      }
      return null
    }
  }

  maxDate(maxDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (moment(control.value).isAfter(moment(maxDate))) {
        return {'maxDate': {requiredValue: maxDate}}
      }
      return null
    }
  }

  dateBetween(startDate: Date, endDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!moment(control.value).isBetween(moment(startDate), moment(endDate))) {
        return {'dateBetween': {requiredValue: [startDate, endDate]}}
      }
      return null
    }
  }
}
