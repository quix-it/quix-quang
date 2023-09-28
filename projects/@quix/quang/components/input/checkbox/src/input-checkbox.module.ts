import { NgModule } from '@angular/core'
import { QuangInputCheckboxComponent } from './input-checkbox.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputCheckboxComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputCheckboxComponent]
})
export class QuangInputCheckboxModule {}
