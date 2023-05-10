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
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { InputDateModule } from 'projects/quang-components/input-date/public-api'
import { InputDateRangeModule } from 'projects/quang-components/input-date-range/public-api'
import { InputDateTimeModule } from 'projects/quang-components/input-date-time/public-api'
import { InputTimeModule } from 'projects/quang-components/input-time/public-api'

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
    InputDateModule,
    InputDateRangeModule,
    InputDateTimeModule,
    InputTimeModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'date' }]
})
export class KsDateModule {}
