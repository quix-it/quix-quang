import { NgModule } from '@angular/core'
import { QuangInputFractionComponent } from './input-fraction.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputFractionComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputFractionComponent]
})
export class QuangInputFractionModule {}
