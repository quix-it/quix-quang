import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { PopoverModule } from 'ngx-bootstrap/popover'

import { MultiSelectStrgComponent } from './multi-select-strg.component'

@NgModule({
  declarations: [MultiSelectStrgComponent],
  imports: [CommonModule, TranslocoModule, FormsModule, PopoverModule],
  exports: [MultiSelectStrgComponent]
})
export class QuangMultiSelectStrgModule {}
