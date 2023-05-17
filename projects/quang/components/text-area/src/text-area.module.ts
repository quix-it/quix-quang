import { NgModule } from '@angular/core'
import { TextAreaComponent } from './text-area.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TextFieldModule } from '@angular/cdk/text-field'

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, TextFieldModule, TranslocoModule, FormsModule],
  exports: [TextAreaComponent]
})
export class QuangTextAreaModule {}
