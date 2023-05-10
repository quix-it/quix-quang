import { NgModule } from '@angular/core'
import { InputColorComponent } from './input-color.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputColorComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputColorComponent]
})
export class InputColorModule {}
