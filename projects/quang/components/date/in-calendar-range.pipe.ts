import { Pipe, PipeTransform } from '@angular/core'

import { CalendarDay, CalendarRange } from './date.component'

@Pipe({
  name: 'inCalendarRange',
  standalone: true,
  pure: false
})
export class InCalendarRangePipe implements PipeTransform {
  transform(c: CalendarDay, selectedCalenderRange?: CalendarRange): any {
    let x =
      c?.date?.setHours(0, 0, 0, 0) >= (selectedCalenderRange?.startDay?.date?.setHours(0, 0, 0, 0) ?? 0) &&
      c?.date?.setHours(0, 0, 0, 0) <= (selectedCalenderRange?.endDay?.date?.setHours(0, 0, 0, 0) ?? 0)
    return x
  }
}
