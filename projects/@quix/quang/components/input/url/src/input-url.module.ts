import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputUrlComponent } from './input-url.component'

@NgModule({
  declarations: [QuangInputUrlComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputUrlComponent]
})
export class QuangInputUrlModule {}
