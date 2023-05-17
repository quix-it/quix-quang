import { NgModule } from '@angular/core'
import { SelectStrgComponent } from './select-strg.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [SelectStrgComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [SelectStrgComponent]
})
export class QuangSelectStrgModule {}
