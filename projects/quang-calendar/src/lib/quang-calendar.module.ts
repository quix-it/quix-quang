import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar/calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { TranslocoModule } from '@ngneat/transloco'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  bootstrap5Plugin,
  interactionPlugin,
  timeGridPlugin
])

@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    TranslocoModule
  ]
})
export class QuangCalendarModule {}
