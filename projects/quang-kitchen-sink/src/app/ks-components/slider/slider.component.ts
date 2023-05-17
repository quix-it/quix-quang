import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-slider',
  templateUrl: './slider.component.html',
  styles: []
})
export class SliderComponent {
  group: FormGroup = new FormGroup({
    slider: new FormControl(null, Validators.required)
  })

  groupVert: FormGroup = new FormGroup({
    slider: new FormControl(null, Validators.required)
  })
}
