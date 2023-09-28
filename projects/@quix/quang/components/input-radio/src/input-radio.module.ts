import { NgModule } from '@angular/core'
import { InputRadioComponent } from './input-radio.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputRadioComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputRadioComponent]
})
export class QuangInputRadioModule {}
