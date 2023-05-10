import { NgModule } from '@angular/core'
import { InputFractionComponent } from './input-fraction.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputFractionComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputFractionComponent]
})
export class InputFractionModule {}
