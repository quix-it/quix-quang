import { NgModule } from '@angular/core'
import { QuangInputTextComponent } from './input-text.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputTextComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputTextComponent]
})
export class QuangInputTextModule {}
