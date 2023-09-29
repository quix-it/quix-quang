import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'

import { InputDateTimeComponent } from './input-date-time.component'

@NgModule({
  declarations: [InputDateTimeComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [InputDateTimeComponent]
})
export class QuangInputDateTimeModule {}
