import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { addYears } from 'date-fns'

@Component({
  selector: 'ks-date-range',
  templateUrl: './date-range.component.html',
  styles: []
})
export class DateRangeComponent {
  minDate: Date = new Date()
  maxDate: Date = addYears(new Date(), 1)

  group: FormGroup = new FormGroup({
    dateRange: new FormControl([], Validators.required)
  })

  groupMinMax: FormGroup = new FormGroup({
    dateRange: new FormControl('', Validators.required)
  })

  groupISO: FormGroup = new FormGroup({
    dateRange: new FormControl('', Validators.required)
  })
}
