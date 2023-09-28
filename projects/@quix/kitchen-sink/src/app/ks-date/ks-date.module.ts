import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { KsDateRoutingModule } from './ks-date-routing.module'
import { DateComponent } from './date/date.component'
import { DateRangeComponent } from './date-range/date-range.component'
import { DateTimeComponent } from './date-time/date-time.component'
import { TimeComponent } from './time/time.component'
import { QuangCardsModule } from '../../../../quang/components/cards/src/lib/quang-cards.module'
import { QuangInputDateModule } from '../../../../quang/components/input-date/src/input-date.module'
import { QuangInputDateRangeModule } from '../../../../quang/components/input-date-range/src/input-date-range.module'
import { QuangInputDateTimeModule } from '../../../../quang/components/input-date-time/src/input-date-time.module'
import { QuangInputTimeModule } from '../../../../quang/components/input-time/src/input-time.module'

@NgModule({
  declarations: [
    DateComponent,
    DateRangeComponent,
    DateTimeComponent,
    TimeComponent
  ],
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
