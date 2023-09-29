import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { SelectObjComponent } from './select-obj.component'

@NgModule({
  declarations: [SelectObjComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [SelectObjComponent]
})
export class QuangSelectObjModule {}
