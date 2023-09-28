import { NgModule } from '@angular/core'
import { QuangInputRadioComponent } from './input-radio.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputRadioComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputRadioComponent]
})
export class QuangInputRadioModule {}
