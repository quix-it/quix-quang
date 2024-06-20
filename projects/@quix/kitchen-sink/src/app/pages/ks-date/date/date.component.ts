import { AfterViewInit, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { addYears } from 'date-fns'

@Component({
  selector: 'ks-date',
  templateUrl: './date.component.html',
  styles: []
})
export class DateComponent implements AfterViewInit {
  minDate: Date = new Date()
  maxDate: Date = addYears(new Date(), 1)

  dateStringControl = new FormControl('', { nonNullable: true })

  group = new FormGroup({
    date: new FormControl<Date | string | null>(null, Validators.required)
  })

  groupMinMax = new FormGroup({
    date: new FormControl(null, Validators.required)
  })

  fillDate(string = false): void {
    const date = this.dateStringControl.value.length
      ? string
        ? this.dateStringControl.value
        : new Date(this.dateStringControl.value)
      : string
      ? new Date().toISOString()
      : new Date()
    this.group.patchValue({ date })
  }

  disableForm(): void {
    this.group.disable()
  }

  enableForm(): void {
    this.group.enable()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.group.disable()
    }, 500)
  }
}
