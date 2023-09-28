import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { addMonths } from 'date-fns'

@Component({
  selector: 'ks-date-time',
  templateUrl: './date-time.component.html',
  styles: []
})
export class DateTimeComponent {
  minDate: Date = new Date()
  maxDate: Date = addMonths(new Date(), 1)

  group: FormGroup = new FormGroup({
    datetime: new FormControl('', Validators.required)
  })

  groupMinMax: FormGroup = new FormGroup({
    datetime: new FormControl('', Validators.required)
  })
}
