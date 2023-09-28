import { Component } from '@angular/core'
import { subtract } from 'ngx-bootstrap/chronos'
import { QuangCalendarEvent } from '../../../../../quang/calendar/src/calendar/calendar.model'

@Component({
  selector: 'ks-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent {
  openAlert (event: any): void {
    alert(event.date ?? event.event._def?.title)
  }

  loadData (e: any, success: any, error: any): any {
    return success([
      new QuangCalendarEvent('inizio', e.startStr),
      new QuangCalendarEvent('fine', subtract(new Date(), 1, 'day')),
      new QuangCalendarEvent('altro', subtract(new Date(), 1, 'day')),
      new QuangCalendarEvent('fare', subtract(new Date(), 1, 'day')),
      new QuangCalendarEvent('cose', subtract(new Date(), 1, 'day'))
    ])
  }

  loadAsyncData (e: any, success: any, error: any): any {
    new Promise((resolve) => {
      setTimeout(
        () => { resolve([new QuangCalendarEvent('evento', new Date())]) },
        3000
      )
    }).then(
      (r: any) => {
        return success(r)
      },
      (e: any) => {
        return error([])
      }
    )
  }
}
