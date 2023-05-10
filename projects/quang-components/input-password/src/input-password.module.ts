import { NgModule } from '@angular/core'
import { InputPasswordComponent } from './input-password.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputPasswordComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputPasswordComponent]
})
export class InputPasswordModule {}
