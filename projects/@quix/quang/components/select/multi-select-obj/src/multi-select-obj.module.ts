import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { PopoverModule } from 'ngx-bootstrap/popover'

import { QuangInputCheckboxModule } from '@quix/quang/components/input/checkbox'

import { MultiSelectObjComponent } from './multi-select-obj.component'

@NgModule({
  declarations: [MultiSelectObjComponent],
  imports: [CommonModule, TranslocoModule, FormsModule, PopoverModule, QuangInputCheckboxModule],
  exports: [MultiSelectObjComponent]
})
export class QuangMultiSelectObjModule {}
