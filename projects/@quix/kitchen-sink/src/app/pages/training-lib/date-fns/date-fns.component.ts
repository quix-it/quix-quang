import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { addDays, addMonths, addYears, format, formatDistanceStrict } from 'date-fns'

@Component({
  selector: 'ks-date-fns',
  templateUrl: './date-fns.component.html',
  styles: []
})
export class DateFnsComponent {
  group: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required),
    dateRange: new FormControl([], Validators.required)
  })

  dateFormat: string = 'yyyy-MM-dd'
  today = format(new Date(), this.dateFormat)

  dayResult: string = ''

  monthResult: string = ''

  yearResult: string = ''

  distance: string = ''

  addDay(): void {
    this.dayResult = format(addDays(new Date(), this.group.get('number')?.value), this.dateFormat)
  }

  addMonth(): void {
    this.monthResult = format(addMonths(new Date(), this.group.get('number')?.value), this.dateFormat)
  }

  addYear(): void {
    this.yearResult = format(addYears(new Date(), this.group.get('number')?.value), this.dateFormat)
  }

  datesDistance(): void {
    this.distance = formatDistanceStrict(
      new Date(this.group.get('dateRange')?.value[0]),
      new Date(this.group.get('dateRange')?.value[1])
    )
  }
}
