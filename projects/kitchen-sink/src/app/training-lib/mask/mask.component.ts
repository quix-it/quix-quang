import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-mask',
  templateUrl: './mask.component.html',
  styles: []
})
export class MaskComponent {
  group: FormGroup = new FormGroup({
    mask1: new FormControl(''),
    mask2: new FormControl(''),
    mask3: new FormControl(''),
    mask4: new FormControl('')
  })
}
