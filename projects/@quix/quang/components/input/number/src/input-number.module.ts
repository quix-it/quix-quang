import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputNumberComponent } from './input-number.component'

@NgModule({
  declarations: [QuangInputNumberComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputNumberComponent]
})
export class QuangInputNumberModule {}
