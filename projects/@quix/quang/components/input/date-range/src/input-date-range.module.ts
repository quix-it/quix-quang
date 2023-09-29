import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { QuangInputDateRangeComponent } from './input-date-range.component'

@NgModule({
  declarations: [QuangInputDateRangeComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputDateRangeComponent]
})
export class QuangInputDateRangeModule {}
