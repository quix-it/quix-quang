import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-select-obj',
  templateUrl: './select-obj.component.html',
  styles: []
})
export class SelectObjComponent {
  list = [
    { value: 1, text: 'Item 1' },
    { value: 2, text: 'Item 2' },
    { value: 3, text: 'Item 3' },
    { value: 4, text: 'Item 4' },
    { value: 5, text: 'Item 5' }
  ]

  group: FormGroup = new FormGroup({
    item: new FormControl(null, Validators.required)
  })
}
