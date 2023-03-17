import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-tel',
  templateUrl: './tel.component.html',
  styles: []
})
export class TelComponent {
  group: FormGroup = new FormGroup({
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10)
    ])
  })
}
