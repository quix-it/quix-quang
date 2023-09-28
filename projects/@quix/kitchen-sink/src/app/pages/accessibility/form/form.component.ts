import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent {
  list = [
    { value: 1, text: 'Maschio' },
    { value: 2, text: 'Femmina' },
    { value: 3, text: 'No' }
  ]

  group: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      Validators.minLength(0)
    ]),
    date: new FormControl('', Validators.required),
    datee: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.minLength(9),
      Validators.maxLength(10)
    ]),
    sex: new FormControl(null, Validators.required),
    checkbox: new FormControl(null, Validators.required)
  })
}
