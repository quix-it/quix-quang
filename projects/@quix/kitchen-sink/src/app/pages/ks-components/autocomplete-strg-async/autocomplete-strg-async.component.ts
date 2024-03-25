import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-strg-async',
  templateUrl: './autocomplete-strg-async.component.html',
  styles: []
})
export class AutocompleteStrgAsyncComponent {
  group: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required])
  })
}
