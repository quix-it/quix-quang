import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { MultiSelectObjComponent } from './multi-select-obj.component'

@NgModule({
  declarations: [MultiSelectObjComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [MultiSelectObjComponent]
})
export class QuangMultiSelectObjModule {}
