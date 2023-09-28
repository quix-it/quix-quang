import { NgModule } from '@angular/core'
import { QuangTextAreaComponent } from './text-area.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TextFieldModule } from '@angular/cdk/text-field'

@NgModule({
  declarations: [QuangTextAreaComponent],
  imports: [CommonModule, TextFieldModule, TranslocoModule, FormsModule],
  exports: [QuangTextAreaComponent]
})
export class QuangTextAreaModule {}
