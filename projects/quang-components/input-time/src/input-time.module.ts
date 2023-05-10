import { NgModule } from '@angular/core'
import { InputTimeComponent } from './input-time.component'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputTimeComponent],
  imports: [
    CommonModule,
    TimepickerModule.forRoot(),
    TranslocoModule,
    FormsModule
  ],
  exports: [InputTimeComponent]
})
export class InputTimeModule {}
