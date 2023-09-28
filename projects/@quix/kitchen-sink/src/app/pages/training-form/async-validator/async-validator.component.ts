import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AsyncValidatorService } from './async-validator.service'

@Component({
  selector: 'ks-async-validator',
  templateUrl: './async-validator.component.html',
  styles: []
})
export class AsyncValidatorComponent {
  constructor(private readonly AsyncValidatorService: AsyncValidatorService) {}

  group: FormGroup = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
      asyncValidators: [
        this.AsyncValidatorService.validate.bind(this.AsyncValidatorService)
      ]
    }),
    lastName: new FormControl('', {
      validators: Validators.required
    }),
    email: new FormControl('', {
      validators: Validators.required
    }),
    checkbox: new FormControl(null, {
      validators: Validators.required
    })
  })

  save(): void {}
}
