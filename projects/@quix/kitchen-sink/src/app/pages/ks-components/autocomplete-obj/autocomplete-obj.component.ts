import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styles: []
})
export class AutocompleteObjComponent {
  list = [
    { key: 1, name: 'Dark Phoenix' },
    { key: 2, name: 'Ultron' },
    { key: 3, name: 'Galactus' },
    { key: 4, name: 'Thanos' },
    { key: 5, name: 'Juggernaut' }
  ]

  group: FormGroup = new FormGroup({
    key: new FormControl('', [Validators.required])
  })
}
