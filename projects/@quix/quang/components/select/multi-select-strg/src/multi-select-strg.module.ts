import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { MultiSelectStrgComponent } from './multi-select-strg.component'

@NgModule({
  declarations: [MultiSelectStrgComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [MultiSelectStrgComponent]
})
export class QuangMultiSelectStrgModule {}
