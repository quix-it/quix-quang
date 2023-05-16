import { NgModule } from '@angular/core'
import { InputCheckboxComponent } from './input-checkbox.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputCheckboxComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputCheckboxComponent]
})
export class QuangInputCheckboxModule {}
