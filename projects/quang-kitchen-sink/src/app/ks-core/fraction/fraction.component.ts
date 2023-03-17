import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-fraction',
  templateUrl: './fraction.component.html',
  styles: []
})
export class FractionComponent {
  group: FormGroup = new FormGroup({
    fraction: new FormControl(0, Validators.required)
  })
}
