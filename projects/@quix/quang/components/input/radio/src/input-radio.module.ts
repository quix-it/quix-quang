import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputRadioComponent } from './input-radio.component'

@NgModule({
  declarations: [QuangInputRadioComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputRadioComponent]
})
export class QuangInputRadioModule {}
