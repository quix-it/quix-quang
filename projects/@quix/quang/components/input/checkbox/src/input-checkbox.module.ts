import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputCheckboxComponent } from './input-checkbox.component'

@NgModule({
  declarations: [QuangInputCheckboxComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputCheckboxComponent]
})
export class QuangInputCheckboxModule {}
