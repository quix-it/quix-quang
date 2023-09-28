import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-multi-select-strg',
  templateUrl: './multi-select-strg.component.html',
  styles: []
})
export class MultiSelectStrgComponent {
  list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

  group: FormGroup = new FormGroup({
    items: new FormControl(null, Validators.required)
  })
}
