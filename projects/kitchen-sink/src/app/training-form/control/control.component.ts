import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'ks-control',
  templateUrl: './control.component.html',
  styles: []
})
export class ControlComponent {
  control: FormControl = new FormControl('')
}
