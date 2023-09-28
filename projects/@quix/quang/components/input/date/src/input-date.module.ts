import { NgModule } from '@angular/core'
import { QuangInputDateComponent } from './input-date.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [QuangInputDateComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [QuangInputDateComponent]
})
export class QuangInputDateModule {}
