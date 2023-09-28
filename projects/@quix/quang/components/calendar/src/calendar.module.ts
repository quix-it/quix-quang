import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import { TranslocoModule } from '@ngneat/transloco'

import { QuangCalendarComponent } from './calendar/calendar.component'

@NgModule({
  declarations: [QuangCalendarComponent],
  exports: [QuangCalendarComponent],
  imports: [CommonModule, FullCalendarModule, TranslocoModule]
})
export class QuangCalendarModule {}
