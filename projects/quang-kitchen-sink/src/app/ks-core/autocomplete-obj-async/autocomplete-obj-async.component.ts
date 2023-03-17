import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-obj-async',
  templateUrl: './autocomplete-obj-async.component.html',
  styles: []
})
export class AutocompleteObjAsyncComponent {
  group: FormGroup = new FormGroup({
    key: new FormControl(undefined, [Validators.required])
  })
}
