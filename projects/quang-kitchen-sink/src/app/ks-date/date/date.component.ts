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

  date = 'Thu Apr 06 2023 18:09:36 GMT+0200 (Ora legale dell’Europa centrale)'

  fillDate (): void {
    this.group.patchValue({ date: this.date })
  }
}
