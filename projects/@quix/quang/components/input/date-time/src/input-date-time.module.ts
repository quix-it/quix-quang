import { CommonModule } from '@angular/common'
import { Inject, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'

import { localeSetup } from '@quix/quang/components/input/date-common'

import { InputDateTimeComponent } from './input-date-time.component'

@NgModule({
  declarations: [InputDateTimeComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [InputDateTimeComponent]
})
export class QuangInputDateTimeModule {
  constructor(@Inject(LOCALE_ID) locale: string, localeService: BsLocaleService) {
    localeSetup(locale, localeService)
  }
}
