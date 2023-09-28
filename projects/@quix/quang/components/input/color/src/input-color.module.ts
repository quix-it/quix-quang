import { NgModule } from '@angular/core'
import { QuangInputColorComponent } from './input-color.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputColorComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputColorComponent]
})
export class QuangInputColorModule {}
