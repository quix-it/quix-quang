import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar/calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { TranslocoModule } from '@ngneat/transloco'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  bootstrapPlugin,
  interactionPlugin,
  timeGridPlugin
])

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    TranslocoModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class QuangCalendarModule { }
