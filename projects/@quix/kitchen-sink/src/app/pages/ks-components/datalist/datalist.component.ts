import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-datalist',
  templateUrl: './datalist.component.html',
  styles: []
})
export class DatalistComponent {
  list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  group: FormGroup = new FormGroup({
    select: new FormControl('', [Validators.required])
  })
}
