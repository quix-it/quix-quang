import { NgModule } from '@angular/core'
import { InputTelComponent } from './input-tel.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputTelComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputTelComponent]
})
export class QuangInputTelModule {}
