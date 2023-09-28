import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-checkbox',
  templateUrl: './checkbox.component.html',
  styles: []
})
export class CheckboxComponent {
  group: FormGroup = new FormGroup({
    checkbox: new FormControl(null, Validators.required)
  })
}
