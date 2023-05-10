import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-number',
  templateUrl: './number.component.html',
  styles: []
})
export class NumberComponent {
  group: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required)
  })
}
