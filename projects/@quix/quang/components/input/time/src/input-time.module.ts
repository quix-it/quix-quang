import { CommonModule } from '@angular/common'
import { Inject, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'

import { localeSetup } from '@quix/quang/components/input/date-common'

import { QuangInputTimeComponent } from './input-time.component'

@NgModule({
  declarations: [QuangInputTimeComponent],
  imports: [CommonModule, TimepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputTimeComponent]
})
export class QuangInputTimeModule {
  constructor(@Inject(LOCALE_ID) locale: string, localeService: BsLocaleService) {
    localeSetup(locale, localeService)
  }
}
