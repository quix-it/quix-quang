import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputFractionComponent } from './input-fraction.component'

@NgModule({
  declarations: [QuangInputFractionComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputFractionComponent]
})
export class QuangInputFractionModule {}
