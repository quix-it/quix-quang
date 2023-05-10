import { NgModule } from '@angular/core'
import { InputDateRangeComponent } from './input-date-range.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputDateRangeComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [InputDateRangeComponent]
})
export class InputDateRangeModule {}
