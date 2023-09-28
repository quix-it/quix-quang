import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsCalendarRoutingModule } from './ks-calendar-routing.module'
import { CalendarComponent } from './calendar/calendar.component'
import { SharedModule } from '../shared/shared.module'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { QuangCalendarModule } from '../../../../@quix/quang/calendar/src/lib/quang-calendar.module'
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    KsCalendarRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    QuangCalendarModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'calendar' }]
})
export class KsCalendarModule {}
