import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-strg',
  templateUrl: './autocomplete-strg.component.html',
  styles: []
})
export class AutocompleteStrgComponent implements OnInit {
  // list = [
  //   'Iron Man',
  //   'Capitan America',
  //   'Thor',
  //   'Hulk',
  //   'Vedova Nera',
  //   ' Occhio di Falco',
  //   ' War Machine',
  //   ' Falcon',
  //   'Visione',
  //   'Scarlet',
  //   'Quicksilver'
  // ]
  list: string[] = []

  group: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.group.controls.text.valueChanges.subscribe((value) => {
      console.log(value)
    })
    setTimeout(() => {
      this.list = [
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
    }, 5000)
  }

  searchTextChange($event: string): void {
    console.log('searchTextChange', $event)
    setTimeout(() => {
      this.list = ['Dark Phoenix', 'Ultron', 'Galactus', $event + 'ciao']
    }, 1000)
  }
}
