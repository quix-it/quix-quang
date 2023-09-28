import { NgModule } from '@angular/core'
import { QuangInputPasswordComponent } from './input-password.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputPasswordComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputPasswordComponent]
})
export class QuangInputPasswordModule {}
