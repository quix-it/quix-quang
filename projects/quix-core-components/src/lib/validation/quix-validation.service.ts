import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuixValidationService {

  constructor() {
  }

  isValid(form, input) {
    if (form.get(input).valid && form.get(input).dirty) {
      return 'is-valid';
    }
    if (form.get(input).invalid && form.get(input).dirty) {
      return 'is-invalid';
    }
  }
}
