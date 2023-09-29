import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import {
  QuangInputDateModule,
  QuangInputDateRangeModule,
  QuangInputDateTimeModule,
  QuangInputTimeModule
} from '@quix/quang/components/input'

import { SharedModule } from '../../shared/shared.module'
import { KsDateRoutingModule } from './ks-date-routing.module'

import { DateRangeComponent } from './date-range/date-range.component'
import { DateTimeComponent } from './date-time/date-time.component'
import { DateComponent } from './date/date.component'
import { TimeComponent } from './time/time.component'

@NgModule({
  declarations: [DateComponent, DateRangeComponent, DateTimeComponent, TimeComponent],
  imports: [
    CommonModule,
    KsDateRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangInputDateModule,
    QuangInputDateRangeModule,
    QuangInputDateTimeModule,
    QuangInputTimeModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'date' }]
})
export class KsDateModule {}
