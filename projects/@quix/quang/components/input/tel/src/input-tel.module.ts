import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputTelComponent } from './input-tel.component'

@NgModule({
  declarations: [QuangInputTelComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputTelComponent]
})
export class QuangInputTelModule {}
