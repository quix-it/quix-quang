import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { QuangInputDateComponent } from './input-date.component'

@NgModule({
  declarations: [QuangInputDateComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputDateComponent]
})
export class QuangInputDateModule {}
