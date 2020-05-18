import {Injectable} from '@angular/core';

@Injectable()
export class QuixStyleService {

  constructor() {
  }

  getClassArray(validator, customClass) {
    const classArray = [];
    if (validator) {
      classArray.push(validator);
    }
    if (customClass) {
      classArray.push(customClass);
    }
    return classArray;
  }

  getClassValidation(form, input) {
    if (form.get(input).valid && form.get(input).dirty) {
      return 'is-valid';
    }
    if (form.get(input).invalid && form.get(input).dirty) {
      return 'is-invalid';
    }
  }

}
