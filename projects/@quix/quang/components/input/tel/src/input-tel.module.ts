import { NgModule } from '@angular/core'
import { QuangInputTelComponent } from './input-tel.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputTelComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputTelComponent]
})
export class QuangInputTelModule {}
