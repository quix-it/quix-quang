import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-select-strg',
  templateUrl: './select-strg.component.html',
  styles: []
})
export class SelectStrgComponent {
  list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

  group: FormGroup = new FormGroup({
    item: new FormControl(null, Validators.required)
  })
}
