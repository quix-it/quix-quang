import { NgModule } from '@angular/core'
import { InputDateComponent } from './input-date.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [InputDateComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [InputDateComponent]
})
export class QuangInputDateModule {}
