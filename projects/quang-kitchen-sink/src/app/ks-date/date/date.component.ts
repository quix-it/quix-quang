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
  date = '2020-02-28T00:00:00.000Z'

  group: FormGroup = new FormGroup({
    date: new FormControl(undefined, Validators.required)
  })

  groupMinMax: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required)
  })

  groupISO: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required)
  })

  fillDate (): void {
    this.group.patchValue({ date: this.date })
  }

  disableForm (): void {
    this.group.disable()
  }

  enableForm (): void {
    this.group.enable()
  }
}
