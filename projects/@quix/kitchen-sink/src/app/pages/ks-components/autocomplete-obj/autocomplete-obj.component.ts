import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styles: []
})
export class AutocompleteObjComponent implements OnInit {
  list: any[] = []

  group: FormGroup = new FormGroup({
    key: new FormControl(1, [Validators.required])
  })

  onReset(): void {
    this.group.reset()
  }

  ngOnInit() {
    this.group.controls.key.valueChanges.subscribe((value) => {
      console.log(value)
    })
    setTimeout(() => {
      this.list = [
        { key: 1, name: 'Dark Phoenix' },
        { key: 2, name: 'Ultron' },
        { key: 3, name: 'Galactus' },
        { key: 4, name: 'Thanos' },
        { key: 5, name: 'Juggernaut' }
      ]
    }, 5000)
  }

  searchTextChange($event: string) {
    console.log('searchTextChange', $event)
    setTimeout(() => {
      this.list = [
        { key: 1, name: 'Dark Phoenix' },
        { key: 2, name: 'Ultron' },
        { key: 3, name: 'Galactus' },
        { key: 4, name: $event + 'ciao' }
      ]
    }, 1000)
  }
}
