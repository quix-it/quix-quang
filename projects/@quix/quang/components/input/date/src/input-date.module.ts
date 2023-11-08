import { CommonModule } from '@angular/common'
import { Inject, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'

import { QuangInputDateComponent } from './input-date.component'

import { localeSetup } from '../../date-common/locale-setup'

@NgModule({
  declarations: [QuangInputDateComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TranslocoModule, FormsModule],
  exports: [QuangInputDateComponent]
})
export class QuangInputDateModule {
  constructor(@Inject(LOCALE_ID) locale: string, localeService: BsLocaleService) {
    localeSetup(locale, localeService)
  }
}
