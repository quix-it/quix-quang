import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'

import { QuangInputTimeComponent } from './input-time.component'

@NgModule({
  declarations: [QuangInputTimeComponent],
  imports: [CommonModule, TimepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputTimeComponent]
})
export class QuangInputTimeModule {}
