import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCalendarModule } from '@quix/quang/components/calendar'
import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { KsCalendarRoutingModule } from './ks-calendar-routing.module'

import { CalendarComponent } from './calendar/calendar.component'

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
