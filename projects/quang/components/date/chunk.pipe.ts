import { Pipe, PipeTransform } from '@angular/core'

import { CalendarDay } from './date.component'

@Pipe({
  name: 'chunk',
  standalone: true
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: CalendarDay[], chunkSize: number): any {
    let calendarDays: CalendarDay[][] = []
    let weekDays: CalendarDay[] = []

    calendarDaysArray.map((day, index) => {
      weekDays.push(day)
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays)
        weekDays = []
      }
    })
    return calendarDays
  }
}
