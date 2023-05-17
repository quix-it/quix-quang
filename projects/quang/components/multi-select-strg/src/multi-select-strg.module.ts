import { NgModule } from '@angular/core'
import { MultiSelectStrgComponent } from './multi-select-strg.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [MultiSelectStrgComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [MultiSelectStrgComponent]
})
export class QuangMultiSelectStrgModule {}
