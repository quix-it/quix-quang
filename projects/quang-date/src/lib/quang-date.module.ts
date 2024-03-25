import { NgModule } from '@angular/core'
import { InputDateRangeComponent } from './input-date-range/input-date-range.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { FormsModule } from '@angular/forms'
import { InputDateComponent } from './input-date/input-date.component'
import { InputDateTimeComponent } from './input-date-time/input-date-time.component'
import { InputTimeComponent } from './input-time/input-time.component'

@NgModule({
  declarations: [
    InputDateRangeComponent,
    InputDateComponent,
  InputDateTimeComponent,
    InputTimeComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [
    InputDateRangeComponent,
    InputDateComponent,
    InputDateTimeComponent,
    InputTimeComponent
  ]
})
export class QuangDateModule {}
