import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { addYears } from 'date-fns'

@Component({
  selector: 'ks-date',
  templateUrl: './date.component.html',
  styles: []
})
export class DateComponent {
  minDate: Date = new Date()
  maxDate: Date = addYears(new Date(), 1)

  group: FormGroup = new FormGroup({
    date: new FormControl(undefined, Validators.required)
  })

  groupMinMax: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required)
  })

  groupISO: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required)
  })
}
