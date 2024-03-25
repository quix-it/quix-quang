import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputColorComponent } from './input-color.component'

@NgModule({
  declarations: [QuangInputColorComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputColorComponent]
})
export class QuangInputColorModule {}
