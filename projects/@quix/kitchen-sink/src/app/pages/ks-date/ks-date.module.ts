import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangInputDateModule } from '@quix/quang/components/input/date'
import { QuangInputDateRangeModule } from '@quix/quang/components/input/date-range'
import { QuangInputDateTimeModule } from '@quix/quang/components/input/date-time'
import { QuangInputTimeModule } from '@quix/quang/components/input/time'

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
  ]
})
export class KsDateModule {}
