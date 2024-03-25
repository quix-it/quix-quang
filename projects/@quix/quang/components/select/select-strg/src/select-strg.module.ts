import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { SelectStrgComponent } from './select-strg.component'

@NgModule({
  declarations: [SelectStrgComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [SelectStrgComponent]
})
export class QuangSelectStrgModule {}
