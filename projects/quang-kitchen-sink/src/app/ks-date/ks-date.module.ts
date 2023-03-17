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
import { QuangDateModule } from '../../../../quang-date/src/lib/quang-date.module'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'

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
    QuangComponentsModule,
    QuangDateModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangDateModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'date' }]
})
export class KsDateModule {}
