import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputTextComponent } from './input-text.component'

@NgModule({
  declarations: [QuangInputTextComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputTextComponent]
})
export class QuangInputTextModule {}
