import { NgModule } from '@angular/core'
import { QuangInputNumberComponent } from './input-number.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputNumberComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputNumberComponent]
})
export class QuangInputNumberModule {}
