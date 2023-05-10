import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-color',
  templateUrl: './color.component.html',
  styles: []
})
export class ColorComponent {
  group: FormGroup = new FormGroup({
    color: new FormControl(null, Validators.required)
  })
}
