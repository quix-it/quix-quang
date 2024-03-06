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
  date = new Date('2020-02-28')

  group = new FormGroup({
    date: new FormControl<Date | null>(null, Validators.required)
  })

  groupMinMax = new FormGroup({
    date: new FormControl(null, Validators.required)
  })

  groupISO = new FormGroup({
    date: new FormControl(null, Validators.required)
  })

  fillDate(): void {
    this.group.patchValue({ date: this.date })
  }

  disableForm(): void {
    this.group.disable()
  }

  enableForm(): void {
    this.group.enable()
  }
}
