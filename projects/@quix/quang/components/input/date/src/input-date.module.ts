import { CommonModule } from '@angular/common'
import { Inject, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'

import { localeSetup } from '@quix/quang/components/input/date-common'

import { QuangInputDateComponent } from './input-date.component'

@NgModule({
  declarations: [QuangInputDateComponent],
  imports: [CommonModule, BsDatepickerModule.forRoot(), TranslocoModule, FormsModule, ReactiveFormsModule],
  exports: [QuangInputDateComponent]
})
export class QuangInputDateModule {
  constructor(@Inject(LOCALE_ID) locale: string, localeService: BsLocaleService) {
    localeSetup(locale, localeService)
  }
}
