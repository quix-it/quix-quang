import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-multi-select-obj',
  templateUrl: './multi-select-obj.component.html',
  styles: []
})
export class MultiSelectObjComponent {
  list = [
    { value: 1, text: 'Item 1' },
    { value: 2, text: 'Item 2' },
    { value: 3, text: 'Item 3' },
    { value: 4, text: 'Item 4' },
    { value: 5, text: 'Item 5' }
  ]

  group: FormGroup = new FormGroup({
    items: new FormControl(null, Validators.required)
  })
}
