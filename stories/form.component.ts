import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'form-component',
  template:
    `
      <form [formGroup]="group">
        <input type="text" formControlName="text">
      </form>
    `
  ,
  styles: []
})

export default class FormComponent {
  group: FormGroup = new FormGroup({
    text: new FormControl(
      '',
      [Validators.required, Validators.minLength(0), Validators.maxLength(50)]
    )
  })
}
