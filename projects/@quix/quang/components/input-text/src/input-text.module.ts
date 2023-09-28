import { NgModule } from '@angular/core'
import { InputTextComponent } from './input-text.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputTextComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputTextComponent]
})
export class QuangInputTextModule {}
