import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  group: FormGroup = new FormGroup({
    search: new FormControl(null, Validators.required)
  })
}
