import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { setHours } from 'date-fns'

@Component({
  selector: 'ks-time',
  templateUrl: './time.component.html',
  styles: []
})
export class TimeComponent {
  minTime: Date = setHours(new Date(), 8)
  maxTime: Date = setHours(new Date(), 20)

  group: FormGroup = new FormGroup({
    time: new FormControl(null, Validators.required)
  })

  groupMinMax: FormGroup = new FormGroup({
    time: new FormControl('', Validators.required)
  })
}
