import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-group-group',
  templateUrl: './group-group.component.html',
  styles: []
})
export class GroupGroupComponent {
  group: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl(0),
    locale: new FormGroup({
      address: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    })
  })
}
