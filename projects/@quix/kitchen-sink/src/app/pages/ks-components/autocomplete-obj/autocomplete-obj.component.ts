import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styleUrls: ['./autocomplete-obj.component.scss']
})
export class AutocompleteObjComponent implements OnInit {
  list: any[] = []

  group: FormGroup = new FormGroup({
    key: new FormControl(null, [Validators.required])
  })

  constructor(private readonly http: HttpClient) {}

  onReset(): void {
    this.group.reset()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.list = [
        {
          key: 1,
          name: 'Dark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark PhoenixDark Phoenix'
        },
        { key: 2, name: 'Ultron' },
        { key: 3, name: 'Galactus' },
        { key: 4, name: 'Thanos' },
        { key: 5, name: 'Juggernaut' }
      ]
    }, 500)
  }

  searchTextChange($event: string): void {
    setTimeout(() => {
      this.list = [
        { key: 1, name: 'Dark Phoenixaaaa' },
        { key: 2, name: 'Ultronaaaaa' },
        { key: 3, name: 'Galactus' },
        { key: 4, name: 'Thanos' },
        { key: 5, name: 'Juggernaut' }
        // { key: 6, name: $event + 'ciao' }
      ].filter((x) => x.name.toLowerCase().includes($event.toLowerCase()))
    }, 500)
  }
}
