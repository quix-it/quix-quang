import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-strg',
  templateUrl: './autocomplete-strg.component.html',
  styles: []
})
export class AutocompleteStrgComponent {
  list = [
    'Iron Man',
    'Capitan America',
    'Thor',
    'Hulk',
    'Vedova Nera',
    ' Occhio di Falco',
    ' War Machine',
    ' Falcon',
    'Visione',
    'Scarlet',
    'Quicksilver'
  ]

  group: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required])
  })
}
