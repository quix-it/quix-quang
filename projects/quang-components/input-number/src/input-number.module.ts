import { NgModule } from '@angular/core'
import { InputNumberComponent } from './input-number.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputNumberComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputNumberComponent]
})
export class InputNumberModule {}
