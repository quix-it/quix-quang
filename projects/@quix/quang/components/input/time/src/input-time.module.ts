import { NgModule } from '@angular/core'
import { QuangInputTimeComponent } from './input-time.component'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputTimeComponent],
  imports: [
    CommonModule,
    TimepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [QuangInputTimeComponent]
})
export class QuangInputTimeModule {}
