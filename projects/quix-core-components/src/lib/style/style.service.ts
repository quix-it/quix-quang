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

}
