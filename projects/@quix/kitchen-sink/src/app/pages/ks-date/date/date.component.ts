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
    date: new FormControl<Date | string | null>(null, Validators.required)
  })

  groupMinMax = new FormGroup({
    date: new FormControl(null, Validators.required)
  })

  fillDate(string = false): void {
    this.group.patchValue({ date: string ? '2024-02-19T15:04:46.000Z' : this.date })
  }

  disableForm(): void {
    this.group.disable()
  }

  enableForm(): void {
    this.group.enable()
  }
}
