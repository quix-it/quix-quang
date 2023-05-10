import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms'

@Component({
  selector: 'ks-sync-validator',
  templateUrl: './sync-validator.component.html',
  styles: []
})
export class SyncValidatorComponent {
  group: FormGroup = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, this.validateInput()]
    }),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    checkbox: new FormControl(null, [Validators.required])
  })

  validateInput (): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.toString().toLowerCase().includes('mario')) {
        return { validInput: true }
      }
      return null
    }
  }

  save (): void {}
}
