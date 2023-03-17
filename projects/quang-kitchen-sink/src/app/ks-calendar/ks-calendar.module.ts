import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsCalendarRoutingModule } from './ks-calendar-routing.module'
import { CalendarComponent } from './calendar/calendar.component'
import { SharedModule } from '../shared/shared.module'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { QuangCalendarModule } from '../../../../quang-calendar/src/lib/quang-calendar.module'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    KsCalendarRoutingModule,
    SharedModule,
    QuangComponentsModule,
    TranslocoModule,
    QuangCalendarModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'calendar' }]
})
export class KsCalendarModule {}
