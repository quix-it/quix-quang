import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent {
  group: FormGroup = new FormGroup({
    text: new FormControl(''),
    number: new FormControl(0),
    email: new FormControl('')
  })
}
