import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputPasswordComponent } from './input-password.component'

@NgModule({
  declarations: [QuangInputPasswordComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputPasswordComponent]
})
export class QuangInputPasswordModule {}
