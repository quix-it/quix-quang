import { NgModule } from '@angular/core'
import { MultiSelectObjComponent } from './multi-select-obj.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [MultiSelectObjComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [MultiSelectObjComponent]
})
export class MultiSelectObjModule {}
