import { CommonModule } from '@angular/common'
import { Inject, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'

import { localeSetup } from '@quix/quang/components/input/date-common'

import { QuangInputDateRangeComponent } from './input-date-range.component'

@NgModule({
  declarations: [QuangInputDateRangeComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputDateRangeComponent]
})
export class QuangInputDateRangeModule {
  constructor(@Inject(LOCALE_ID) locale: string, localeService: BsLocaleService) {
    localeSetup(locale, localeService)
  }
}
