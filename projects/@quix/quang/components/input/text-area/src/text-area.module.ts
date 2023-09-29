import { TextFieldModule } from '@angular/cdk/text-field'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangTextAreaComponent } from './text-area.component'

@NgModule({
  declarations: [QuangTextAreaComponent],
  imports: [CommonModule, TextFieldModule, TranslocoModule, FormsModule],
  exports: [QuangTextAreaComponent]
})
export class QuangTextAreaModule {}
